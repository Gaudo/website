'use strict'

var readdirp = require('readdirp')
var template = require('jade')
var templateOptions = {debug: false, compileDebug: false, cache: true, pretty: false}
var Promise = require('promise')
var fs = require('fs')
var path = require('path')
var views = 'views'

var server = require('http').createServer()
    .on('request', function (request, response) 
        {
            var routes = require('./routes')

            response.render =
                function (filePath, locals, code)
                {
                    var UrlGenerator = require('./UrlGenerator')
                    var urlGenerator = new UrlGenerator(routes)
                    locals = locals || {}
                    locals.getRouteUrl = urlGenerator.generate
                    var fn = template.compileFile(path.join(views, filePath), templateOptions)
                    response.setHeader('Content-Type', 'application/xhtml+xml');
                    if(!code)
                        code = 200
                    response.statusCode = code
                    response.end(fn(locals))
                }

            response.redirect = 
                function (url, isTemporary)
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
                function (route)
                {    
                    var UrlClass = require('url')
                    var parsedUrl = UrlClass.parse(request.url)

                    if(route.method !== undefined && request.method.toUpperCase() !== route.method.toUpperCase())
                        return false

                    var isQueryStringAvailable = parsedUrl.query !== null

                    if(!route.allowQueryString && isQueryStringAvailable)
                        return false

                    var matchingUrl = parsedUrl.pathname.match(route.regex)

                    if(matchingUrl === null)
                        return false

                    var params = matchingUrl.slice(1)       

                    return !route.callback(request, response, params)
                }
            )

            if(!result)
                response.render('errors/404.jade', {} , 404)
        }
    )

process.on('uncaughtException',
    function(err)
    {
        console.log(err)
        if(server._handle !== null)
            server.close()
    }                
)

process.on('SIGTERM',
    function()
    {
        if(server._handle !== null)
            server.close()
    }    
)

process.on('SIGINT',
    function()
    {
        if(server._handle !== null)
            server.close()
    }    
)

readdirp({ root: views, fileFilter: '*.jade' })
    .once('end',
        function()
        {
            var dir = '/tmp/socks'
            var file = 'gaudo-net.sock'
            var filePath = path.join(dir, file)

            if(!fs.existsSync(dir))
                fs.mkdirSync(dir, 755)

            if(fs.existsSync(filePath))
                fs.rmdirSync(filePath)

            server.listen(filePath)
        }
    )
    .on('data',
        function (entry)
        {
            template.compileFile(path.join(views, entry.path), templateOptions)
        }
    )

