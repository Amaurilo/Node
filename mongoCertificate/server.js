const http = require('http');
const https = require('https');
const port =  3000;
const sslport =  443;


var path = require('path');
var fs = require('fs');
const app = require('./app');

const sslapp = require('express');


var httpsOptions = {
    key: fs.readFileSync('./ssl/node-key.pem'),
    cert: fs.readFileSync('./ssl/node-cert.pem')
};
 
// sslapp.get('/', function(req , res){
//     res.send('got it ssl');
// });

http.createServer(app).listen(port,function(){
    console.log('Listening on port 80');
});

https.createServer(httpsOptions, app).listen(sslport,function(){
    console.log('Listening on port 443');
});