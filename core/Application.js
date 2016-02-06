var Express = require('express')
var Path = require('path')

var redirectToLowercase = require(__MIDDLEWARES + 'redirectToLowercase')
var setXhtmlMime = require(__MIDDLEWARES + 'setXhtmlMime')
var redirectTrailingSlash = require(__MIDDLEWARES + 'redirectTrailingSlash')
var routeToUrl = require(__HELPERS + 'routeToUrl')
var addToRouter = require(__CORE + 'addToRouter')

module.exports = Application

function Application(routes)
{
    var app = Express()
    var router = Express.Router({caseSensitive: true, strict: true})

    routes.forEach(addToRouter(router))
    app.locals.routeToUrl = routeToUrl(routes)

    app.set('strict routing', true)
    app.set('case sensitive routing', true)
    app.set('view engine', 'jade')
    app.set('views', Path.join(__APP_PUBLIC, 'views'))

    app.use(redirectToLowercase)
    app.use(setXhtmlMime)
    app.use(router)
    app.use(redirectTrailingSlash)
    app.use(
        function (req, res)
        {
            res.status(404).render('errors/404')
        }
    )

    this.getApp =
        function getApp()
        {
            return app
        }
}
