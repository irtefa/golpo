var socket = io.connect();

socket.on('connect', function(){
    var name = prompt("What is your name?");
    socket.emit('join', name);

    // append the user when a new user signs in
    socket.on('new_user', function(name) {
        $('#user-list').append("<p>" + name + "</p><hr>");
    });

    socket.on('users', function(clients, messages) {
        // clear list to avoid duplications or users and messages
        $('#user-list').empty();
        $('#chat-list').empty();
        // show people who are online
        for(i=0; i < clients.length; i++){
            $('#user-list').append("<p>" + clients[i] + "</p><hr>");
        }
        // show message history in the chat room
        for(i=0; i < messages.length; i++){
            $('#chat-list').append("<p><b>" + messages[i].name +"</b>: " + messages[i].msg +"</p> <p><b>At:</b> " + messages[i].time+ "</p><hr>");
        }
    });

});

$('#bngl').click(function(e) {
    $('.bangla').removeClass('hidden');
    $('.english').addClass('hidden');
    $('#engl').removeClass('hide');
    $('#bngl').addClass('hide');
});

$('#engl').click(function(e) {
    $('.english').removeClass('hidden');
    $('.bangla').addClass('hidden');
    $('#bngl').removeClass('hide');
    $('#engl').addClass('hide');
});

$('#send').click(function(e) {
    var msg = "";
    if ($('.english').val() ==="") {
        msg = $('.bangla').val();
        $('.bangla').val('');
    }
    else {
        msg = $('.english').val();
        $('.english').val('');
    }
    socket.emit('message', msg, moment().format('MMMM Do YYYY, h:mm a'));
});

socket.on('chat', function(data) {
    $('#chat-list').append("<p><b>" + data.name +"</b>: " + data.msg +"</p> <p><b>At:</b> " + moment().format('MMMM Do YYYY, h:mm a') + "</p><hr>");
});

