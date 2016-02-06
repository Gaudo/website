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

        var upperCaseFound = /[A-Z]/g.test(parsedUrl.path)
        if(!upperCaseFound) {
            return next()
        }

        var lowerPathName = parsedUrl.pathname.toLowerCase()
        var match = testMatchingRoute(request.app._router.stack, method, lowerPathName)
        if(!match) {
            return next()
        }

        var qs = ''
        if(parsedUrl.search !== null)
            qs = parsedUrl.search.toLowerCase()


        response.redirect(lowerPathName + qs)
    }

