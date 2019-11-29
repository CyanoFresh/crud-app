module.exports = {
  behindProxy: Boolean(process.env.BEHIND_PROXY),
  ports: {
    MQTT: process.env.MQTT_PORT || 1883,
    WS: process.env.WS_PORT || 8888,
    HTTP: process.env.HTTP_PORT || 8080,
  },
  auth: {
    maxAge: 60 * 60 * 24 * 7,
  },
};
