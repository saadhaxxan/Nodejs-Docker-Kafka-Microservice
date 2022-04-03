const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');

app = express();

const mongo_uri  = process.env.MONGO_URL;
const consumer = new kafka.Consumer(new kafka.KafkaClient(process.env.KAFKA_BOOTSTRAP_SERVERS), [{ topic: process.env.KAFKA_TOPIC}]);
consumer.on('message', function (message) {
    console.log(message);
});

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
    }
);

