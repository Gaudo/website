var db = require.main.require('./database');

module.exports = router = require('express').Router();

router.get(/^\/guide$/, function (request, response) {
    response.redirect(301, '/guide/');
});

router.get(/^\/guide\/$/, function (request, response) {
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

