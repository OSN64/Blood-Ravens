var http = require('http')
var options = {
    host: '127.0.0.1',
    port: 1337,
    path: '/',
    method: 'GET'
};
//console.log('send')
var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});
console.log('send')

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});
http.get("http://localhost:1337/", function(res) {
  console.log("Got response: " + res.satatusCode);
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});
