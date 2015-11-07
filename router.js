'use strict'

module.exports = function(caseSensitive, strict) {
        var express = require('express')
        var slash = require('express-slash')()
        var router = express.Router({
                'caseSensitive': caseSensitive,
                'strict'       : strict
        })
        var guides = require('./controllers/guides')

        router.use( (request, response, next) => {
            response.setHeader('Content-Type', 'application/xhtml+xml')
            next()
        })

        router.use('/guide/', guides(caseSensitive, strict));

        router.get('/chi-sono/', (request, response) => {
                response.render('chi_sono')
        })

        router.get('/curriculum-vitae', (request, response) => {

        })

        router.get('/', (request, response) => {
            response.render('index.jade', {});
        })

        router.use(slash)

        router.use( (req, res, next) => {
            res.status(404)
            res.send('404')
        })

        return router
}
