var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 3000 : process.env.PORT;
var publicPath = path.resolve(__dirname, 'public');

app.use(function( req, res, next ) {
    for(var prop in req.query) {
        res.redirect('https://www.setmine.com/' + prop);
        return;
    }
    next();
});

app.use(express.static(publicPath));

if (!isProduction) {
    var bundle = require('./server/bundle.js');
    bundle();

    app.all('/build/*', function (req, res) {
        proxy.web(req, res, {
            target: 'http://localhost:8080'
        });
    });

}

proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});


app.get('*', function( req, res, next ) {

    
    res.sendFile(__dirname + '/public/index.html');
});


app.listen(port, function () {
    console.log('Server running on port ' + port);
});