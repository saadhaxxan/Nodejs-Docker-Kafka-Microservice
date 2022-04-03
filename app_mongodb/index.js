const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');

app = express();

const mongo_uri  = process.env.MONGO_URL;
console.log(mongo_uri);
mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected to the database');
});


const consumer = new kafka.Consumer(new kafka.KafkaClient("172.17.0.1:9092"), [{ topic: process.env.KAFKA_TOPIC}]);
consumer.on('message', function (message) {
    console.log(message);
});

consumer.on('error', err => {
    console.log(err);
});


app.get('/',(req,res)=>{

    res.send("MongoDB App Running")
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
    }
);

