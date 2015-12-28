var Url = require('url')

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
        var parsedUrl = Url.parse(request.url)
        var upperCaseFound = /[A-Z]/g.test(parsedUrl.path)

        if(!upperCaseFound) {
            return next()
        }
    
        response.redirect(parsedUrl.path.toLowerCase())
    }
