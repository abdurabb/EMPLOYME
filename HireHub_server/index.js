require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const stripe = require('stripe');
const socket = require("socket.io");
const http = require('http');
const express = require('express');
const userRoute = require('./routers/userRoute');
const adminRoute = require('./routers/adminRoute');
const companyRoute = require('./routers/companyRoute');
const port = process.env.PORT;
const cors = require('cors');
const app = express();
const server = http.createServer(app);

app.use(cors());

// Socket Io Connect 
const io = socket(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  }
});

io.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  });
});

// Database Connect 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/hire_hub', { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message);
  });
const db = mongoose.connection;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/company', companyRoute);

server.listen(port, function () {
  console.log('Server running on port ' + port);
});
