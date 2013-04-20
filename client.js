var socket = io.connect('http://localhost:8000');
socket.on('connect', function(){
    var name = prompt("What is your name?");
    socket.emit('join', name);
});
$('#submit-btn').click(function(e) {
    var msg = $('#chat-input').val();
    socket.emit('message', msg);
});

socket.on('chat', function(data){
    $("#chat-list").append("<p>" + data.name +": " + data.msg +"</p>");
    console.log(data);
});
