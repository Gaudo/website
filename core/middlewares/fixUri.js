var Url = require('url')
var testMatchingRoute = require(__LIBS + 'testMatchingRoute')

module.exports =
    function(request, response, next)
    {        
        var method = request.method.toLowerCase();

        if (!(method === 'get' || method === 'head')) {
            next();
            return;
        }

        var parsedUrl = Url.parse(request.url)
        var lowerPathName = parsedUrl.pathname.toLowerCase()
        var qs = parsedUrl.search !== null ? parsedUrl.search.toLowerCase() : ''

        var match = false

        match = testMatchingRoute(request.app._router.stack, method, lowerPathName)
        if(match) {
            response.redirect(301, lowerPathName + qs)
            return
        }

        var hasSlash = lowerPathName.charAt(lowerPathName.length - 1) === '/';
        if(hasSlash) {
            lowerPathName = lowerPathName.slice(0, -1)
            match = testMatchingRoute(request.app._router.stack, method, lowerPathName)
            if(match) {
                response.redirect(301, lowerPathName + qs)
                return
            }
        } else {
            lowerPathName = lowerPathName+'/'
            match = testMatchingRoute(request.app._router.stack, method, lowerPathName)
            if(match) {
                response.redirect(301, lowerPathName + qs)
                return
            }
        }

        return next()
    }

