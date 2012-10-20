var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io')
  , fs = require('fs')
  , io = require('socket.io').listen(server);

app.use("/js", express.static(__dirname + '/js'));
//app.listen(1234);

server.listen(1234);


app.get('/', function (req, res) {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(fs.readFileSync(__dirname + '/index.html'));
});

io.sockets.on('connection', function (socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg.alpha);
        socket.broadcast.emit('message', msg);
    });
    socket.on('point', function (msg) {
        console.log('point received: ', msg.alpha, msg.beta, msg.gamma);
        socket.broadcast.emit('point', msg);
    });

});