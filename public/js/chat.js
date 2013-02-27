var socketInit = function() {
    var socket = new WebSocket('ws://localhost:8000/chat');
console.log('weee');
    socket.addEventListener('open', function(msg) {
        console.log(msg);
    });


    socket.addEventListener('message', function(msg) {
        var obj = JSON.parse(msg);
        console.log(obj);
    });


    socket.addEventListener('close', function(msg) {
        var retry = setTimeout(socketInit, 6000);
    });

}
socketInit();