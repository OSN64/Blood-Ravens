// this will create both http and https server by passing specific module to
//the warp gate script
// grunt minify
// colours with console logs
var config = require('./config.json'),
    service = require('./warp-gate.js'),
    colors = require('colors/safe'),
    http = require('http'), // for accessing the sockets on http
    https = require('https'), // for accessing the sockets on https
    fs = require('fs'), // for accessing the filesystem
    grunt = require('grunt'); // for accessing the filesystem
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

console.log("Starting mitm proxy".green);
console.info("Loading payload....".green);

setTimeout(function(){
    var payload = fs.readFileSync(config.injected_fin_file, "utf8");
    //    setTimeout(function(){},2000)
    printBanner();
    // load each server
    service.run(http,config.http_port,payload);
    console.log("Http Proxy running at: ".green + colors.gray( "localhost:" + config.http_port));
},1)

//var options = {
//    key: fs.readFileSync('./keys/proxy-key.pem'),
//    cert: fs.readFileSync('./keys/proxy-cert.pem')
//}
//service.run(https,config.https_port,payload,options);
//console.log("Https Proxy running at localhost:" + config.https_port);


// funny ascii banners
function printBanner(){

    console.log("")
    console.log("")
    console.log("             ,,########################################,,".red)
    console.log("          .*##############################################*".red)
    console.log("        ,*####*:::*########***::::::::**######:::*###########,".red)
    console.log("      .*####:    *#####*.                 :*###,.#######*,####*.".red)
    console.log("     *####:    *#####*                      .###########*  ,####*".red)
    console.log("  .*####:    ,#######,                        ##########*    :####*".red)
    console.log("  *####.    :#########*,                       ,,,,,,,,.      ,####:".red)
    console.log("    ####*  ,##############****************:,,               .####*".red)
    console.log("     :####*#####################################**,        *####.".red)
    console.log("       *############################################*,   :####:".red)
    console.log("        .#############################################*,####*".red)
    console.log("          :#####:*****#####################################.".red)
    console.log("            *####:                  .,,,:*****###########,".red)
    console.log("             .*####,                            *######*".red)
    console.log("               .####* :*#######*               ,#####*".red)
    console.log("                 *###############*,,,,,,,,::**######,".red)
    console.log("                   *##############################:".red)
    console.log("                     *####*****##########**#####*".red)
    console.log("                      .####*.            :####*".red)
    console.log("                        :####*         .#####,".red)
    console.log("                          *####:      *####:".red)
    console.log("                           .*####,  *####*".red)
    console.log("                             :####*####*".red)
    console.log("                               *######,".red)
    console.log("                                 *##,".red)
    console.log("")
    console.log("")
}
