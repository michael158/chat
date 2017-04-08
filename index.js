var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

http.listen(8088 , function (){
   console.log('listening on *:8088');
});

app.get('/', function (req, res){
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    // DISCONNECT //
    socket.on('user disconnected', function (user) {
        console.log('the user ' + user + 'is offline');
       io.emit('user disconnected', user);
    });

    socket.on('chat message', function(objectMessage){
        console.log(objectMessage.username+ ' diz: ' + objectMessage.message);
        io.emit('chat message', objectMessage);
    });

    socket.on('user connected', function (user) {
        io.emit('user connected', user);
    })

    // USER KEYUP //
    socket.on('user key', function (user) {
        io.emit('user key', user);
    })

    socket.on('clear key', function () {
        io.emit('clear key');
    })


});
