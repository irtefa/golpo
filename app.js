var socket = require('socket.io');
var io = socket.listen(8000);

var clients = [];
var messages = [];

io.sockets.on('connection', function(client) {

    client.on('join', function(name){
        client.set('nickname', name);
        io.sockets.emit('new_user', name);
        clients.push(name);
        console.log(clients);
    });

    io.sockets.emit('users', clients, messages);

    client.on('message', function(msg, time) {
        client.get('nickname', function(err, name){
            io.sockets.emit('chat', {'name': name, 'msg': msg});
            messages.push({'name': name, 'msg': msg, 'time': time});
        });
    });
});
