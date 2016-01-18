var Url = require('url')
var slash = require(__LIBS + 'slash')
var testMatchingRoute = require(__LIBS + 'testMatchingRoute')

module.exports.disableQueryString =
    function (request, response, next)
    {
        var parsedUrl = Url.parse(request.url)
        if(parsedUrl.search === null)
            return next()

        response.redirect(parsedUrl.pathname)
    }

module.exports.redirectToLowercase =
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

module.exports.xhtml =
    function(request, response, next)
    {        
        response.contentType('application/xhtml+xml')
        next()
    }

module.exports.slash = slash()
