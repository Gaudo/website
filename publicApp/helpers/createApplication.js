var Express = require('express')
var Path = require('path')

var fixUri = require(__CORE + 'middlewares/fixUri')
var setXhtmlMime = require(__CORE + 'middlewares/setXhtmlMime')
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
