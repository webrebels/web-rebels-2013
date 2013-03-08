/*jshint es5:true node:true*/

"use strict";

var config              = require('./config.js'),
    http                = require('http'),
    winston             = require('winston'),
    express             = require('express'),
    WebSocket           = require('ws'),

    app                 = express(),
    httpServer          = http.createServer(app),

    ircLog              = '{"type":"unknown"}',
    ircClient           = new WebSocket('ws://' + config.get('ircServer') + ':' + config.get('ircServerPort') + '/chat'),
    wsServer            = new WebSocket.Server({
        server:  httpServer,
        path : '/stream',
        disableHixie : true
    });



// Set up logger

var log = new (winston.Logger)({
    exitOnError : false,
    transports  : [
        new (winston.transports.Console)({
            silent              : config.get('logConsoleSilent'),
            level               : config.get('logConsoleLevel')
        }),

        new (winston.transports.File)({
            filename            : config.get('logFileFileName'),
            silent              : config.get('logFileSilent'),
            level               : config.get('logFileLevel'),
            handleExceptions    : true
        })
    ]
});



// Broadcast message to all connected websocket clients

function broadcast(socket, msg) {
    var i = socket.clients.length;
    while(i--){
        socket.clients[i].send(msg);
    }
}



// Handle ws connections

wsServer.on('connection', function(ws) {
    var slp = setTimeout(function(){
        ws.send(ircLog);
    }, 80);
});



// Irc Client status messages

ircClient.on('open', function() {
    log.info('Connected to irc bot');
});

ircClient.on('close', function(e) {
    log.info('Closed connected to irc bot!');
});

ircClient.on('error', function(e) {
    log.error('Closed connected to irc bot due to error!');
});


// Handle updates from IRC server

ircClient.on('message', function(msg) {
    var obj = JSON.parse(msg);

    if (obj.type === 'irc:log') {
        ircLog = msg;
    }

    if (obj.type === 'irc:update') {
        broadcast(wsServer, msg);
    }
});



// Configure application

app.disable('x-powered-by');

app.configure('all',function () {
    app.use(express.compress());
    app.use(express.static(config.get('docRoot')));
});



// Set templating engine

app.set('views', 'views');
app.set('view engine', 'ejs');



// Set http routes

app.get('/', function(req, res){
	res.render('frontpage', { pageTitle: 'Web Rebels ☠ Oslo ☠ 2013' });
});
app.get('/sponsors', function(req,res){
	res.render('sponsors', {pageTitle: 'Our sponsors without whom none of this would be possible ☠ Web Rebels ☠ Oslo 2013'});
});
app.get('/sponsoroptions', function(req,res){
    res.render('sponsoroptions', {pageTitle: 'Sponsoring options for the Web Rebels ☠ Oslo 2013'});
});
app.get('/about', function(req,res){
	res.render('about', {pageTitle: '☠ About the Web Rebels ☠'});
});
app.get('/tickets', function(req,res){
    res.render('tickets', {pageTitle: 'Tickets for the Web Rebels ☠ Oslo 2013'});
});
app.get('/ticketConfirmation', function(req,res){
    res.render('ticketConfirmation', {pageTitle: 'Thank you for registering with the Web Rebels ☠ Oslo 2013'});
});
app.get('/location', function(req,res){
	res.render('location', {pageTitle: 'Location of the Web Rebels ☠ Oslo 2013'});
});
app.get('/openmic', function(req,res){
	res.render('openmic', {pageTitle: 'Open Mic Night - Web Rebels ☠ Oslo 2013'});
});
app.get('/schedule', function(req,res){
    res.render('schedule', {pageTitle: 'Schedule for Web Rebels ☠ Oslo 2013'});
});
app.get('/speakers', function(req,res){
    res.render('speakers', {pageTitle: 'Speakers - Web Rebels ☠ Oslo 2013'});
});
app.get('/roadbook', function(req,res){
    res.render('roadbook', {pageTitle: 'Speakers Roadbook - Web Rebels ☠ Oslo 2013'});
});



// Start http server

httpServer.listen(config.get('httpServerPort'));
log.info('WR2013 is running at http://localhost:' + config.get('httpServerPort') + '/');
log.info('Serving documents from ' + config.get('docRoot'));



// Prevent exceptions to bubble up to the top and eventually kill the server

process.on("uncaughtException", function (err) {
    log.error(err.stack);
});