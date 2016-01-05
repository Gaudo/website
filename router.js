var router = require('express').Router({'caseSensitive': true, 'strict': true})
var routes = require('./routes')
var middlewares = require('./middlewares')

router.use(middlewares.redirectToLowercase)

routes.forEach(
    function (element)
    {
        var params = [element.pattern]
        
        element.middlewares.forEach(
            function (element)
            {
                params.push(element)
            }
        )
        
        params.push(element.callback)

        switch (element.method.toLowerCase()) {
            case 'get':
                router.get.apply(router, params)
            break

            case 'put':
                router.put.apply(router, params)
            break

            case 'delete':
                router.delete.apply(router, params)
            break

            case 'post':
                router.post.apply(router, params)
            break

            default:
                throw new Error('No method called ' + element.method)
        }
    }
)

module.exports = router
