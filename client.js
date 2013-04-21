var socket = io.connect('http://localhost:8000');

socket.on('connect', function(){
    var name = prompt("What is your name?");
    socket.on('users', function(clients, messages){
        for(i=0; i < clients.length; i++){
            $('#user-list').append("<li>" + clients[i] + "</li><hr>");
        }
        for(i=0; i < messages.length; i++){
            $('#chat-list').append("<p>" + messages[i].name +": " + messages[i].msg +"</p> <p>Posted at: " + messages[i].time+ "</p><hr>");
        }
    });
    $('#user-list').append("<li>" + name + "</li><hr>");
    socket.emit('join', name);
});

$('#submit-bngl').click(function(e) {
    var msg = $('.bangla').val();
    $('.bangla').val('');
    if(msg === ""){
        alert("Cannot send empty messages!");
    }
    else{
        socket.emit('message', msg, moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
});

$('#submit-engl').click(function(e) {
    var msg = $('.english').val();
    $('.english').val('');
    if(msg === ""){
        alert("Cannot send empty messages!");
    }
    else{
        socket.emit('message', msg, moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
});

socket.on('chat', function(data){
    $('#chat-list').append("<p>" + data.name +": " + data.msg +"</p> <p>Posted at: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "</p><hr>");
});


