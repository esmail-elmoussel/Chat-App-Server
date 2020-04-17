const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socket = require('socket.io');
const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose');
const User = require('./models/User');

// Require Controllers
const handleRegister = require('./controllers/handleRegister');
const handleSignin = require('./controllers/handleSignin');

const app = express();

// connecting to MongoDB
var uristring = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app';
mongoose.connect(uristring, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB is not running ya a7a :'));
db.once('open', () => {console.log('MongoDB is running ya som3a!')});

//Middleware
app.use(cors())
app.use(bodyParser.json())


// End Points
app.get('/',(req,res) => {res.json('Its Working')});
app.post('/register',handleRegister(User,bcrypt));
app.post('/signin',handleSignin(User,bcrypt));

app.delete('/delete',(req,res) => {
    User.deleteMany({})
    .then(res.json('success'))
})




const server = app.listen(4000,() => {
    console.log('app is running on port 4000');
});

const io = socket(server);
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)

    socket.on('chat',data => {
        io.sockets.emit('chat',data)
    })
    socket.on('typing',data => {
        socket.broadcast.emit('typing',data)
    })
})