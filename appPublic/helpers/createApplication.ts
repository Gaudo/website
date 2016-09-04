import Express = require('express')
import Path = require('path')

import fixUri = require('CORE/middlewares/fixUri')
import setXhtmlMime = require('CORE/middlewares/setXhtmlMime')
import setRedirectToRoute = require('CORE/middlewares/setRedirectToRoute')
import createRouteToUrl = require('CORE/helpers/createRouteToUrl')
import addToRouter = require('CORE/addToRouter')

function createApplication(routes: any)
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
        function (req: any, res: any)
        {
            res.status(404).render('errors/404')
        }
    )
    app.use(
        function (err: any, req: any, res: any, next: Function)
        {
            if(err !== 404)
                next(err)
            res.status(404).render('errors/404')
        }
    )
    app.use(
        function (err: any, req: any, res: any, next: Function)
        {
            console.log(err.stack)
            res.status(500).render('errors/500')
        }
    )

    return app
}
