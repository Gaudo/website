var Express = require('express')
var Path = require('path')

var fixUri = require(__CORE + 'middlewares/fixUri')
var setXhtmlMime = require(__CORE + 'middlewares/setXhtmlMime')
var setRedirectToRoute = require(__CORE + 'middlewares/setRedirectToRoute')
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
    app.set('x-powered-by', false)

    app.use(setRedirectToRoute(routes))
    app.use(setXhtmlMime)
    app.use(router)
    app.use(fixUri)
    app.use(
        function (req, res)
        {
            res.status(404).render('errors/404')
        }
    )
    app.use(
        function (err, req, res, next)
        {
            if(err !== 404)
                next(err)
            res.status(404).render('errors/404')
        }
    )
    app.use(
        function (err, req, res, next)
        {
            console.log(err.stack)
            res.status(500).render('errors/500')
        }
    )

    return app
}
