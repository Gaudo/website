'use strict'

var http = require('http')


var server = http.createServer(function(request, response) {
    var routes = require('./routes')
    var UrlGenerator = require('./UrlGenerator')
    var urlGenerator = new UrlGenerator(routes)
    var url = urlGenerator.generate('addGuide', {id: '3', title: 'Mortacci Vostri'})

    console.log(url)

    response.redirect = 
        function(isTemporary, url)
        {
            var code = 301

            if(isTemporary)
                code = 302

            response.writeHead(code, {
              'Location': url
            });
            response.end();
        }

    routes.some(
        function(route)
        {    
            var UrlClass = require('url')
            var url = UrlClass.parse(request.url)

            if(request.method.toLowerCase() !== route.method.toLowerCase())
                return false

            var matchingUrl = url.path.match(route.path)
            if(matchingUrl === null)
                return false

            var params = matchingUrl.slice(1)
            return !route.callback(params, request, response)
        }
    )
})

server.listen(3000, 'localhost')

