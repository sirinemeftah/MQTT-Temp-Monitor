let mqttClient;
const topic = "temp"; // Set the topic as a constant

window.addEventListener("load", (event) => {
  connectToBroker();

  
  var toggleButton = document.getElementById('toggleSubscribe');
  toggleButton.setAttribute('data-subscribed', false);
    toggleButton.addEventListener('click', function() {
        var isSubscribed = toggleButton.getAttribute('data-subscribed') === 'true';
        toggleButton.setAttribute('data-subscribed', !isSubscribed);
        toggleButton.textContent = isSubscribed ? 'Subscribe' : 'Unsubscribe';

        // Add your subscribe/unsubscribe logic here
        if (isSubscribed) {
          unsubscribeToTopic();
        } else {
          subscribeToTopic();
        }
    });
});

function connectToBroker() {
  const clientId = "client" + Math.random().toString(36).substring(7);

  // Change this to point to your MQTT broker
  const host = "ws://127.0.0.1:9001/mqtt";
  const seuil = 28;

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
  });

  // Received
  mqttClient.on("message", (topic, message, packet) => {
    console.log(
      "Received Message: " + message.toString() + "\nOn topic: " + topic
    );
    const messageTextArea = document.querySelector("#message");
    
    // Check if message > seuil and trigger an alert
    var parsedMessage = parseFloat(message).toFixed(2);
    if (!isNaN(parsedMessage) && parsedMessage > seuil) {
      parsedMessage= parsedMessage +` Temperature alert! The temperature is greater than ${seuil}.`;
    }
    messageTextArea.value += parsedMessage + "\r\n";
  });
}

function subscribeToTopic() {
  const status = document.querySelector("#status");
  console.log(`Subscribing to Topic: ${topic}`);

  mqttClient.subscribe(topic, { qos: 0 });
  status.innerText = "Subscribed";
}

function unsubscribeToTopic() {
  const status = document.querySelector("#status");
  console.log(`Unsubscribing to Topic: ${topic}`);

  mqttClient.unsubscribe(topic, { qos: 0 });
  status.innerText = "Unsubscribed";
}