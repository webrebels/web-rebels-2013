var http                = require('http'),
    express             = require('express'),

    port                = process.argv[2] ? process.argv[2] : 8000,
    docRoot             = './public',

    app                 = express(),
    httpServer          = http.createServer(app);



// Configure application

app.disable('x-powered-by');
app.use(express.static(docRoot));

app.configure('all',function () {
    app.use(express.compress());
});

app.set('views', 'views');
app.set('view engine', 'ejs');


// Start http server
app.get('/', function(req, res){
	res.render('frontpage', { pageTitle: 'Web Rebels ☠ Oslo ☠ 2013' });
});
app.get('/sponsors', function(req,res){
	res.render('sponsors', {pageTitle: 'Sponsoring options for the Web Rebels ☠ Oslo 2013'})
});
app.get('/openmic', function(req,res){
	res.render('openmic', {pageTitle: 'Open Mic Night - Web Rebels ☠ Oslo 2013'})
});
httpServer.listen(port);
console.info('WR2013 is running at http://localhost:' + port + '/');


// Prevent exceptions to bubble up to the top and eventually kill the server

process.on("uncaughtException", function (err) {
    console.warn(err.stack);
});