var express = require('express'),
    app = express(),
    config = require('./config.json');

// express loads the homepage
app.get('/', function (req, res) {
    //    res.send(__dirname + '/assets/index.handlebars' );
    res.render('user', { name: 'Tobi' }, function(err, html) {
        // ...
    });
});

// app route
app.route('/events')
    .all(function(req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
})
    .get(function(req, res, next) {
    //  res.json(...);
})
    .post(function(req, res, next) {
    // maybe add a new event...
});


var server = app.listen(config.listenPort, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
