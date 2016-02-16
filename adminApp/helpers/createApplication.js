var Express = require('express')
var Path = require('path')
var BodyParser = require('body-parser')

var redirectToLowercase = require(__CORE + 'middlewares/redirectToLowercase')
var setXhtmlMime = require(__CORE + 'middlewares/setXhtmlMime')
var redirectTrailingSlash = require(__CORE + 'middlewares/redirectTrailingSlash')
var routeToUrl = require(__CORE + 'helpers/routeToUrl')
var addToRouter = require(__CORE + 'addToRouter')

module.exports = createApplication

function createApplication(routes)
{
    var app = Express()
    var router = Express.Router({caseSensitive: true, strict: true})

    routes.forEach(addToRouter(router))
    app.locals.routeToUrl = routeToUrl(routes)

    app.set('strict routing', true)
    app.set('case sensitive routing', true)
    app.set('view engine', 'jade')
    app.set('views', Path.join(__APP, 'views'))

    app.use(BodyParser.json())
    app.use(setXhtmlMime)
    app.use(router)
    app.use(redirectTrailingSlash)
    app.use(
        function (req, res)
        {
            res.status(404).render('errors/404')
        }
    )

    return app
}
