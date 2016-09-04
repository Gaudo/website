module.exports =
    function(request, response, next)
    {        
        response.contentType('application/xhtml+xml')
        next()
    }

