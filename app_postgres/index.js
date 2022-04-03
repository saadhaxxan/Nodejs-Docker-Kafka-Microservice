const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');

app = express();

const producer = new kafka.Producer(new kafka.KafkaClient(process.env.KAFKA_BOOTSTRAP_SERVERS));

const servicesRunning = () => {
producer.on('ready', function () {
    console.log('Producer is ready');
});
};
setInterval(servicesRunning, 10000);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});   


