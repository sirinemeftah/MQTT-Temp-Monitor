const mqtt = require('mqtt');

let mqttClient;

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const host = "ws://127.0.0.1:9001/mqtt";

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
  };

  mqttClient = mqtt.connect(host, options);

  mqttClient.on("error", (err) => {
    console.log("Error: ", err);
    mqttClient.end();
  });

  mqttClient.on("reconnect", () => {
    console.log("Reconnecting...");
  });

  mqttClient.on("connect", () => {
    console.log("Client connected:" + clientId);
    publishMessage(); // Call the publishMessage function after connecting
  });

  // Received
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
  });
}

function publishMessage() {
  const topic = "temp";
  setInterval(() => {
    const temperature = Math.random() * (30.0 - 20.0) + 20.0; // Génération d'une valeur aléatoire
    console.log(`Published temperature: ${temperature}`);
    const message = temperature.toString();

    console.log(`Sending Topic: ${topic}, Message: ${message}`);

    mqttClient.publish(topic, message, {
      qos: 0,
      retain: false,
    });
  }, 5000); // Every 5 seconds
}

// Call the connectToBroker function to start the MQTT client
connectToBroker();
