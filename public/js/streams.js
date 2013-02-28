// Check if browser has web socket support

function hasWebSockets(){
    return 'WebSocket' in window && window.WebSocket.CLOSING === 2;
}


// Fetch chat DOM element to append the chat messages to

var elChat = document.getElementById('chat');
if (elChat) {
    elChat.setAttribute('class', 'visible');
}


// Helper to append a DOM element as the fist element to a list

function addFirstListElement(root, element) {
    var first   = root.firstChild,
        el      = document.createElement('li');
    el.appendChild(element);
    root.insertBefore(el, first);
}


// Helper to remove the last DOM element in a list

function removeLastListElement(root) {
    var last            = root.lastChild,
        parentElement   = last.parentNode;

    parentElement.removeChild(last);
}


// DOM builder for chat messages

function buildMessage(obj) {
    var fragment    = document.createDocumentFragment(),
        user        = document.createElement('span'),
        userTxt     = document.createTextNode(obj.usr + ':'),
        msg         = document.createElement('span'),
        msgTxt      = document.createTextNode(obj.msg);

    user.setAttribute("class", 'user');
    msg.setAttribute("class", 'msg');

    user.appendChild(userTxt);
    msg.appendChild(msgTxt);

    fragment.appendChild(user);
    fragment.appendChild(msg);

    return fragment;
}


// Set one element into the chat DOM list

function setIrcUpdate(obj) {
    var el      = buildMessage(obj),
        lis     = document.querySelectorAll('#chat li');

    addFirstListElement(elChat, el);

    if (lis.length >= 10) {
        removeLastListElement(elChat);
    }
}


// Set multiple elements into the chat DOM list

function setIrcLog(obj) {
    var i = obj.messages.length;
    while (i--) {
        setIrcUpdate(obj.messages[i]);
    }
}


// Init websocet connection to the server

var socketInit = function() {
    var socket = new WebSocket('ws://' + window.location.host + '/stream');

    socket.addEventListener('message', function(msg) {
        var obj = JSON.parse(msg.data);

        if (obj.type === 'irc:log') {
            setIrcLog(obj.data);

        } else if (obj.type === 'irc:update') {
            setIrcUpdate(obj.data);

        }
    });

    socket.addEventListener('close', function(msg) {
        var retry = setTimeout(socketInit, 6000);
    });

}


// Load chat server only if the browser support websockets and the page has a chat list

if (hasWebSockets() && elChat) {
    socketInit();
}