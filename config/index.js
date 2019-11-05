module.exports = {
  ports: {
    MQTT: process.env.MQTT_PORT || 1883,
    WS: process.env.WS_PORT || 8888,
    HTTP: process.env.HTTP_PORT || 8080,
  },
};
