'use strict';

require('dotenv').load();
var app = require('express')();

app.set('view engine', 'jade');

app.get(/.*/, function(request, response, next){
    response.setHeader('Content-Type', 'application/xhtml+xml');
    next();
});

app.use(require('./controllers/guides'));
app.use(require('./controllers/statics'));

app.all(/.*/, function (request, response) {
    response.send('NOT FOUND');
});

app.listen(3000, 'localhost');
