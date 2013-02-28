function hasWebSockets(){
    return 'WebSocket' in window && window.WebSocket.CLOSING === 2;
}

function addFirstListElement(root, element) {
    var first   = root.firstChild,
        el      = document.createElement('li');
    el.appendChild(element);
    root.insertBefore(el, first);
}

function removeLastListElement(root) {
    var last            = root.lastChild,
        parentElement   = last.parentNode;

    parentElement.removeChild(last);
}

function setIrcUpdate(message) {
    console.log('update', message);
}

function setIrcLog(messages) {
    console.log('log', messages);
}


var socketInit = function() {
    var socket = new WebSocket('ws://' + window.location.host + '/stream');

    socket.addEventListener('open', function(msg) {
        // console.log(msg);
    });

    socket.addEventListener('message', function(msg) {
        var obj = JSON.parse(msg);

        if (obj.type === 'irc:log') {
            setIrcLog(msg);

        } else if (obj.type === 'irc:update') {
            setIrcUpdate(msg);

        }
    });

    socket.addEventListener('close', function(msg) {
        var retry = setTimeout(socketInit, 6000);
    });

}
if (hasWebSockets()) {
    socketInit();
}