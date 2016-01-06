var helpers = require('./helpers')
var router = require('./router')
var slash = require('./middlewares').slash
var Path = require('path')

module.exports = 
    function (app)
    {
        app.set('strict routing', true)
        app.set('case sensitive routing', true)
        app.set('view engine', 'jade');
        app.set('views', Path.join(__dirname, 'views'));

        app.locals.route = helpers.route

        app.use(router)
        app.use(slash)
        app.use(
            function (req, res)
            {
                res.render('errors/404')
            }
        )

    }

