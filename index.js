process.env.NODE_ENV !== 'production' && require('dotenv').config();
require('make-promises-safe');
const net = require('net');
const http = require('http');
const Aedes = require('aedes');
const webSocketStream = require('websocket-stream');
const { sequelize } = require('./models');
const config = require('./config');

// HTTP
const fastify = require('fastify')();

fastify.get('/', async () => {
  return { ok: true };
});

// MQTT
const aedes = Aedes({
  authenticate: (client, username, password, done) => {
    const { req, id } = client;
    done(null, true);
  },
});

aedes.on('clientError', function(client, err) {
  console.log('client error', client.id, err.message, err.stack);
});

aedes.on('connectionError', function(client, err) {
  console.log('client error', client, err.message, err.stack);
});

aedes.on('publish', function(packet, client) {
  if (client) {
    console.log('message from client', client.id);
  }
});

aedes.on('subscribe', function(subscriptions, client) {
  if (client) {
    console.log('subscribe from client', subscriptions, client.id);
  }
});

aedes.on('client', function(client) {
  console.log('new client', client.id);
});

// Start servers
fastify.listen(config.ports.HTTP, '0.0.0.0', (err, address) => {
  if (err) {
    console.error('Error starting HTTP server:', err);
    return process.exit(1);
  }

  console.log(`HTTP server listening on ${address}`);
});

const httpServer = http.createServer()
  .listen(config.ports.WS, () => console.log('Websocket server listening on port', config.ports.WS));

webSocketStream.createServer({
  server: httpServer,
}, aedes.handle);

net.createServer(aedes.handle)
  .listen(config.ports.MQTT, () => console.log('MQTT server listening on port', config.ports.MQTT));

sequelize
  .authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => {
    console.error('Error connecting to the DB:', err);
    process.exit(4);
  });
