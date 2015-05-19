module.exports = {
    sendClient: function(response, statuscode, webmsg) { // function to send custom response to the client
        response.writeHead(statuscode, {
            "Proxy-agent": "Node-Proxy"
        });
        response.end(webmsg);
    }
}
