
## Publisher

Navigate to the 'publisher' directory and run the following command to install the required dependencies:

```bash
cd publisher
npm install mqtt
```

After installing the dependencies, you can start the MQTT publisher by running the following command:
```bash
node mqtt_publisher.js
```

The publisher is responsible for sending temperature data to the MQTT broker.

## Subscriber
open the html file by choosing the option "open with live server"

##MQTT Broker
run your MQTT broker
```bash
cd C:\Program Files\mosquitto
mosquitto -c mosquitto.conf -v
```
