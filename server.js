/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs'),
    app = express();

function render(res, filename, http_status) {
    if (http_status) {
        res.status(http_status)
    }

    fs.readFile(filename, {
            encoding: 'utf-8',
        }, function(err, data) {
        res.send(data);
    });
}

//**********************************
// Server
//**********************************
var server = app.listen(3000, function(){
    app.use(express.static(__dirname + '/public/'));
    app.use(function(req, res, next) {
        render(res, '404.html', 404);
    });
});

//**********************************
// Routes
//**********************************
app.get('/visualizer', function(req, res) {
    render(res, 'visualizer.html');
});

app.get('/', function(req, res) {
    render(res, 'index.html');
});

