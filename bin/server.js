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
	res.render('sponsors', {pageTitle: 'Our sponsors! Without whom none of this would be possible ☠ Web Rebels ☠ Oslo 2013'})
});
app.get('/sponsoroptions', function(req,res){
    res.render('sponsoroptions', {pageTitle: 'Sponsoring options for the Web Rebels ☠ Oslo 2013'})
});
app.get('/about', function(req,res){
	res.render('about', {pageTitle: '☠ About the Web Rebels ☠'})
});
app.get('/tickets', function(req,res){
    res.render('tickets', {pageTitle: 'Tickets for the Web Rebels ☠ Oslo 2013'})
});
app.get('/ticketConfirmation', function(req,res){
    res.render('ticketConfirmation', {pageTitle: 'Thank you for registering with the Web Rebels ☠ Oslo 2013'})
});
app.get('/location', function(req,res){
	res.render('location', {pageTitle: 'Location of the Web Rebels ☠ Oslo 2013'})
});
app.get('/openmic', function(req,res){
	res.render('openmic', {pageTitle: 'Open Mic Night - Web Rebels ☠ Oslo 2013'})
});
app.get('/schedule', function(req,res){
    res.render('schedule', {pageTitle: 'Schedule for Web Rebels ☠ Oslo 2013'})
});
httpServer.listen(port);
console.info('WR2013 is running at http://localhost:' + port + '/');


// Prevent exceptions to bubble up to the top and eventually kill the server

process.on("uncaughtException", function (err) {
    console.warn(err.stack);
});