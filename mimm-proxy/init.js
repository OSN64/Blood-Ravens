// this will create both http and https server by passing specific module to
//the warp gate script
// grunt minify
// colours with console logs
var config = require('./config.json');
var service = require('./warp-gate.js');
var http = require('http'); // for accessing the sockets on http
var https = require('https'); // for accessing the sockets on https
var fs = require('fs'); // for accessing the filesystem
var grunt = require('grunt'); // for accessing the filesystem

console.log("Starting mitm proxy");

console.info("Loading payload");
var payload = fs.readFileSync(config.injected_fin_file, "utf8");
//console.log(payload);

// load each server

service.run(http,config.http_port,payload);
console.log("Http Proxy running at localhost:" + config.http_port);

//var options = {
//    key: fs.readFileSync('./keys/proxy-key.pem'),
//    cert: fs.readFileSync('./keys/proxy-cert.pem')
//}
//service.run(https,config.https_port,payload,options);
//console.log("Https Proxy running at localhost:" + config.https_port);


// funny ascii banners
