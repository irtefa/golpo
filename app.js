var socket = require('socket.io');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

server.listen(process.env.PORT || 8000);
var clients = [];
var messages = [];

app.configure(function() {
  app.use(express.static(__dirname));
});

app.get('/', function(request, respond) {
    response.sendfile(__dirname + 'index.html');
});
var io = socket.listen(server);

io.sockets.on('connection', function(client) {

    client.on('join', function(name){
        // set nickname
        client.set('nickname', name);
        // only emit a new username
        io.sockets.emit('new_user', name);
        clients.push(name);
    });

    io.sockets.emit('users', clients, messages);

    client.on('message', function(msg, time) {
        client.get('nickname', function(err, name){
            io.sockets.emit('chat', {'name': name, 'msg': msg});
            messages.push({'name': name, 'msg': msg, 'time': time});
        });
    });
});
