var Url = require('url')

module.exports =
    function (request, response, next)
    {
        var parsedUrl = Url.parse(request.url)
        if(parsedUrl.search === null)
            return next()

        response.redirect(parsedUrl.pathname)
    }
