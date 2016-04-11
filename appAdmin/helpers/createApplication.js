var Express = require('express')
var Path = require('path')
var BodyParser = require('body-parser')

var fixUri = require(__CORE + 'middlewares/fixUri')
var setXhtmlMime = require(__CORE + 'middlewares/setXhtmlMime')
var createRouteToUrl = require(__CORE + 'helpers/createRouteToUrl')
var addToRouter = require(__CORE + 'addToRouter')

module.exports = createApplication

function createApplication(routes)
{
    var app = Express()
    var router = Express.Router({caseSensitive: true, strict: true})

    routes.forEach(addToRouter(router))
    app.locals.routeToUrl = createRouteToUrl(routes)

    app.set('strict routing', true)
    app.set('case sensitive routing', true)
    app.set('view engine', 'jade')
    app.set('views', Path.join(__APP, 'views'))

    app.use(BodyParser.json())
    app.use(setXhtmlMime)
    app.use(router)
    app.use(fixUri)
    app.use(
        function (req, res)
        {
            res.status(404).render('errors/404')
        }
    )

    return app
}
