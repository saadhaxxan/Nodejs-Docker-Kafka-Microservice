const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const kafka = require('kafka-node');

app = express();
app.use(express.json());
const servicesRunning = async () =>
{
const db = new sequelize(process.env.POSTGRES_URL);
const User = db.define('user', {
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    }
});
db.sync({force:true});
const client = new kafka.KafkaClient({kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS});
const producer = new kafka.Producer(client);

producer.on('ready', async () => {
    app.post('/', async (req, res) =>{
        console.log(req.body);
        producer.send([{topic: 'auth_service', messages: JSON.stringify(req.body)}], async (err, data)=> {
            if (err) {
                console.log(err);
            }
            else{
                console.log(data);
                await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).then(function (user) {
                    res.send(user);
                }
                ).catch(function (err) {
                    res.send(err);
                }
                );
            }
        });
    });
});
producer.on('error', err => {
    console.log(err);
});
}
setTimeout(servicesRunning, 5000);

app.get('/',(req,res)=>{
    res.send("Postgres App Running")
})


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});   


