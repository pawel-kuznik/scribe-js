var express = require('express');

// create new instance of an express server 
var server = express();

// configure the server
server.use('/', express.static(__dirname + '/samples'));

// start listening on 7644 port
server.listen(7644);
