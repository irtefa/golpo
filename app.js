var socket = require('socket.io');
var io = socket.listen(8000);

var clients = [];
var messages = [];

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
