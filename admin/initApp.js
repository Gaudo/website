var helpers = require(__CORE + 'helpers')
var middlewares = require(__CORE + 'middlewares')
var addToRouter = require(__CORE + 'addToRouter')
var routes = require(__APP + 'routes')
var Path = require('path')
var Express = require('express')
var BodyParser = require('body-parser')

var router = Express.Router({'caseSensitive': true, 'strict': true})
routes.forEach(addToRouter(router))

module.exports = 
    function (app)
    {
        app.set('strict routing', true)
        app.set('case sensitive routing', true)
        app.set('view engine', 'jade');
        app.set('views', Path.join(__dirname, 'views'));

        app.locals.route = helpers.route(routes)

        app.use(BodyParser.json())
        app.use(middlewares.xhtml)
        app.use(router)
        app.use(middlewares.slash)
        app.use(
            function (req, res)
            {
                res.render('errors/404')
            }
        )

    }

