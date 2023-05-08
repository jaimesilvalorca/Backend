const express = require('express');
const events = require('events');
const moment = require('moment');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const messageEventEmitter = new events.EventEmitter();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

app.get('/messages', (req, res) => {
    console.log(`${moment()} - Waiting for new message...`);
    messageEventEmitter.once('newMessage', (from, message) => {
        console.log(`${moment()} - Message Received - from: ${from} - message: ${message}`);
        res.send({ok: true, from, message});
    });
});

app.post('/new-message', (req, res) => {
    const {from, message} = req.body;
    console.log(`${moment()} - New Message - from: ${from} - message: ${message}`);
    messageEventEmitter.emit('newMessage', from, message);
    res.send({ok: true, description: 'Message Sent!'});
});

app.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});