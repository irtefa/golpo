var socket = require('socket.io');
var io = socket.listen(8000);


io.sockets.on('connection', function(client) {
    client.on('join', function(name){
        client.set('nickname', name);
    });
    client.on('message', function(msg) {
        client.get('nickname', function(err, name){
            io.sockets.emit('chat', {'name': name, 'msg': msg});
        });
    });
});
