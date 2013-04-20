var socket = io.connect('http://localhost:8000');

socket.on('connect', function(){
    var name = prompt("What is your name?");
    socket.emit('join', name);
});

$('#submit-bngl').click(function(e) {
    var msg = $('.bangla').val();
    $('.bangla').val('');
    if(msg === ""){
        alert("Cannot send empty messages!");
    }
    else{
        socket.emit('message', msg);
    }
});

$('#submit-engl').click(function(e) {
    var msg = $('.english').val();
    $('.english').val('');
    if(msg === ""){
        alert("Cannot send empty messages!");
    }
    else{
        socket.emit('message', msg);
    }
});

socket.on('chat', function(data){
    $('#chat-list').append("<p>" + data.name +": " + data.msg +"</p> <p>Posted at: " + moment().format('MMMM Do YYYY, h:mm:ss a') + "</p><hr>");
});


