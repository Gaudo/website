'use strict'

module.exports = function(caseSensitive, strict) {
    var db = require.main.require('./database');
    var express = require('express')

    var router = express.Router({
                'caseSensitive': caseSensitive,
                'strict'       : strict
            })

    router.get('/asd/', function (request, response) {
        db.query('SELECT * FROM guides', function (error, rows, fields) {
            response.render('index', {'guides': rows});
        });
    });

    router.get(/^\/guide\/([0-9]+)$/, function (request, response, next) {
        db.query('SELECT * FROM guides WHERE id = ?', [request.params[0]], function (error, rows) {
            if(rows.length === 0)
                return next();

            response.render('view', {'guide': rows[0]});
        });
    });


    router.post(/^\/guide\/$/, function (request, response, next) {
        console.log(request.files);
        console.log('ciao');
        return next();
    });

    return router
} 

