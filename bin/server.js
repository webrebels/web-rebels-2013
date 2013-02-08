var http                = require('http'),
    express             = require('express'),

    port                = process.argv[2] ? process.argv[2] : 8000,
    docRoot             = './public',

    app                 = express(),
    httpServer          = http.createServer(app);



// Configure application

app.disable('x-powered-by');

app.configure('all',function () {
    app.use(express.compress());
    app.use(express.static(docRoot));
});



// Start http server

httpServer.listen(port);
console.info('WR2013 is running at http://localhost:' + port + '/');



// Prevent exceptions to bubble up to the top and eventually kill the server

process.on("uncaughtException", function (err) {
    console.warn(err.stack);
});