'use strict'

var Path = require('path')
var Filesystem = require('fs')
var Jade = require('jade')
var Url = require('url')
var createAsyncReadDirHandler = require('readdirp')
var TemplateRouter = require('./TemplateRouter')
var routes = require('./routes')

var VIEWS_DIRECTORY = Path.join(__dirname, 'views')
var CACHE = false
var PRETTY = true

if(process.env.NODE_ENV === 'production') {
    CACHE = true
    PRETTY = false
}

var jadeOptions = {cache: CACHE, pretty: PRETTY}
var templateRouter = new TemplateRouter(VIEWS_DIRECTORY, jadeOptions, routes)

var server = require('http').createServer()
    .on('request',
        function (request, response) 
        {
            response.render =
                function (filePath, locals, code)
                {
                    var html = templateRouter.render(filePath, locals, code)
                    if(!code)
                        code = 200

                    response.setHeader('Content-Type', 'application/xhtml+xml')
                    response.statusCode = code
                    response.end(html)
                }
            
            response.redirect =
                function(code, isTemporary)
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
                    var parsedUrl = Url.parse(request.url)

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

createAsyncReadDirHandler({ root: VIEWS_DIRECTORY, fileFilter: '*.jade' })
    .once('end',
        function()
        {
            var dir = '/tmp/socks'
            var file = 'gaudo-net.sock'
            var filePath = Path.join(dir, file)

            if(!Filesystem.existsSync(dir))
                Filesystem.mkdirSync(dir, 755)

            if(Filesystem.existsSync(filePath))
                Filesystem.unlinkSync(filePath)

            server.listen(filePath)
        }
    )
    .on('data',
        function (entry)
        {
            Jade.compileFile(Path.join(VIEWS_DIRECTORY, entry.path), jadeOptions)
        }
    )

