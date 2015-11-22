'use strict'

var http = require('http')

var server = http.createServer(
    function (request, response) 
    {
        var template = require('jade')
        var routes = require('./routes')

        response.render =
            function(filePath, locals)
            {
                var UrlGenerator = require('./UrlGenerator')
                var urlGenerator = new UrlGenerator(routes)
                locals = locals || {}
                locals.getRouteUrl = urlGenerator.generate
                var fn = template.compileFile(filePath)
                response.setHeader('Content-Type', 'application/xhtml+xml');
                response.end(fn(locals))
            }

        response.redirect = 
            function(url, isTemporary)
            {
                var code = 301

                if(isTemporary)
                    code = 302

                response.writeHead(code, {
                  'Location': url
                });
                response.end();
            }

        var result = routes.some(
            function(route)
            {    
                var UrlClass = require('url')
                var parsedUrl = UrlClass.parse(request.url)

                if(route.method !== undefined && request.method.toUpperCase() !== route.method.toUpperCase())
                    return false

                var isDefinedQueryString = parsedUrl.query !== null

                if(!route.allowQueryString && isDefinedQueryString)
                    return false

                var matchingUrl = parsedUrl.pathname.match(route.regex)

                if(matchingUrl === null)
                    return false

                var params = matchingUrl.slice(1)       

                return !route.callback(params, request, response)
            }
        )

        if(!result)
            response.end('404')
    }
)

server.listen(3000, 'localhost')

