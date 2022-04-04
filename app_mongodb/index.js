const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');

app = express();

const servicesRunning = async () =>
{
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('we are connected to the database');
});

const User = mongoose.model('User', {
    id: Number,
    name: String,
    email: String,
    password: String
});
const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS});
const consumer = new kafka.Consumer(client, [{topic: 'auth_service', partition: 0}], {autoCommit: false});
consumer.on('message',async (message) => {
    const user = await new User(JSON.parse(message.value));
    console.log(user);
    await user.save()
});

consumer.on('error', err => {
    console.log(err);
});

}
setTimeout(servicesRunning, 5000);

app.get('/',(req,res)=>{
    res.send("MongoDB App Running")
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
    }
);

