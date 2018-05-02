const express = require('express');
const SerialPort = require('serialport');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');


const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);
const Readline = SerialPort.parsers.Readline

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')));

const serialPort = new SerialPort('/dev/ttyACM0', {
  baudRate: 9600
})

const parser = new Readline()
serialPort.pipe(parser)
parser.on('data', function (data) {
  io.emit('arduino:data',data);
})

serialPort.on('open', function () {
  console.log('Communication is on!')
})

server.listen(app.get('port'),()=>{
  console.log(`Server run on port ${app.get('port')}`);
})