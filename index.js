var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

http.listen(3000 , function (){
   console.log('listening on *:3000');
});

app.get('/', function (req, res){
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    // DISCONNECT //
    socket.on('disconnect', function () {
       console.log('user disconnected');
    });

    socket.on('chat message', function(objectMessage){
        console.log(objectMessage.username+ ' diz: ' + objectMessage.message);
        io.emit('chat message', objectMessage);
    });

    socket.on('user connected', function (user) {
        io.emit('user connected', user);
    })


});
