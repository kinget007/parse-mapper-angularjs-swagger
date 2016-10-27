// ParseMapper AngularJS
var host = process.env.PORT ? '0.0.0.0' : '127.0.0.1';
var port = process.env.PORT || 54321;

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

app.listen(port, function () {
    console.log('Running ParseMapper AngularJS on ' + host + ':' + port);
});

// CORS Anywhere
var exec = require('child_process').exec;
var proxy = exec('node ./proxy.js');
proxy.stdout.on('data', function(data) {
    console.log(data);
});
proxy.stderr.on('data', function(data) {
    console.log(data);
});
proxy.on('close', function(code) {
    console.log(code);
});

// Open browser to ParseMapper
var open = require('open');
open('http://' + host + ':' + port);
