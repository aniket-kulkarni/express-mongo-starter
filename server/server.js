/**
 * Server Statup File
 */

var app = require('express')();
var server = require('http').Server(app);
var bodyParser      = require('body-parser');
var requestHandler = require('./handlers/request-handler');
var dbHandler = require('./handlers/dbHandler');
var config = require('./config/config');
var dbSettings = config.mongodb;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

server.listen(3001, function() {
    console.log('Successfully connected...');
    dbHandler.connect(dbSettings, (err) => {
        if(err) {
            throw new Error(err.message);
        }
        else {
            console.log('Db Connection Successful');
        }
    });
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/test', requestHandler.test);


process.on('uncaughtException', function(err) {
    console.log('uncaughtException exception: ' + err);
});

module.exports = app;
