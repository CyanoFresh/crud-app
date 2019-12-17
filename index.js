require('make-promises-safe');
process.env.NODE_ENV !== 'production' && require('dotenv').config();
const net = require('net');
const http = require('http');
const Aedes = require('aedes');
const webSocketStream = require('websocket-stream');
const models = require('./models');
const config = require('./config');
const tokenService = require('./services/auth/tokenService');

/**
 * @property {aedes.Aedes} aedes
 * @property {FastifyInstance} fastify
 */
class App {
  constructor() {
    this.models = models;
    this.config = config;

    this.initMqtt();
    this.initHttp();
  }

  initMqtt() {
    this.aedes = Aedes({
      authenticate: async (client, username, password, done) => {
        const closeWithError = (code = 4, message = 'Unauthorized') => {
          const error = new Error(message);
          error.returnCode = code;
          return done(error, false);
        };

        try {
          // Handle websocket user
          if (client.conn && client.conn.req) {
            const cookies = Object.fromEntries(client.conn.req.headers.cookie.split(/; */).map(x => x.split('=')));

            if (cookies && cookies.token) {
              const user = await tokenService.getUserByToken(cookies.token);

              if (!user) {
                return closeWithError();
              }

              client.user = user;
            }
          }

          return done(null, true);
        } catch (e) {
          return closeWithError();
        }
      },
    });

    this.aedes.on('clientError', function(client, err) {
      console.log('client error', client.id, err.message, err.stack);
    });

    this.aedes.on('connectionError', function(client, err) {
      console.log('client connection error', client, err.message, err.stack);
    });

    this.aedes.on('publish', function(packet, client) {
      if (client) {
        console.log('message from client', client.id);
      }
    });

    this.aedes.on('subscribe', function(subscriptions, client) {
      if (client) {
        console.log('subscribe from client', subscriptions, client.id);
      }
    });

    this.aedes.on('client', function(client) {
      console.log('new client', client.id);
    });
  }

  initHttp() {
    this.fastify = require('fastify')({
      trustProxy: config.behindProxy,
    });

    this.fastify.register(require('fastify-sensible'));
    this.fastify.register(require('fastify-cookie'));

    if (process.env.NODE_ENV === 'production') {
      this.fastify.register(require('fastify-helmet'), {
        hidePoweredBy: { setTo: 'PHP 4.2.0' },
      });

      this.fastify.register(require('fastify-rate-limit'), {
        global: false,
      });
    }

    this.loadModules();

    this.fastify.register(require('./services'), {
      prefix: '/api',
      app: this,
    });
  }

  loadModules() {
    this.modules = {};

    this.config.modules.forEach(module => {
      this.modules[module.id] = require(`./modules/${module.id}`)(this, module);
    })
  }

  start() {
    this.fastify.listen(config.ports.HTTP, '0.0.0.0', (err, address) => {
      if (err) {
        console.error('Error starting HTTP server:', err);
        return process.exit(1);
      }

      console.log(`HTTP server listening on ${address}`);
    });

    const httpServer = http.createServer().listen(config.ports.WS, () =>
      console.log('Websocket server listening on port', config.ports.WS));

    webSocketStream.createServer({ server: httpServer }, (stream, request) => {
      // TODO: wait for fix in Aedes upstream
      stream.req = request;
      this.aedes.handle(stream);
    });

    net.createServer(this.aedes.handle).listen(config.ports.MQTT, () =>
      console.log('MQTT server listening on port', config.ports.MQTT));

    models.sequelize.authenticate()
      .then(() => console.log('DB connected'))
      .catch(err => {
        console.error('Error connecting to the DB:', err);
        process.exit(4);
      });
  }
}

const app = new App();

app.start();
