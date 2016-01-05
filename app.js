'use strict'

var Express = require('express')
var Http = require('http')
var Filesystem = require('fs')
var Path = require('path')
var Utils = require('./utils')
var app = Express()
var router = require('./router')
var slash = require('./middlewares').slash

app.set('strict routing', true)
app.set('case sensitive routing', true)
app.set('view engine', 'jade');

app.locals.getRouteUrl =
    function (name, params)
    {
        var routes = require('./routes')
        var generator
        routes.some(
            function (element)
            {
                if (element.name !== name)
                    return false
                
                generator = element.generator
                return true
            }
        )

        for(var key in params) {
            var value = Utils.slug(params[key])
            generator = generator.replace('{'+key+'}', value)
        }

        return generator
    }

app.use(router)
app.use(slash)

var server = Http.createServer(app)

server.on('listening',
    function()
    {
        process.on('uncaughtException',
            function(err)
            {
                console.log(err)
                server.close()
            }                
        )

        process.on('SIGTERM',
            function()
            {
                server.close()
            }    
        )

        process.on('SIGINT',
            function()
            {
                server.close()
            }    
        )
    }
)

var dir = '/tmp/socks'
var file = 'gaudo-net.sock'
var filePath = Path.join(dir, file)

if(!Filesystem.existsSync(dir))
    Filesystem.mkdirSync(dir, 755)

if(Filesystem.existsSync(filePath))
    Filesystem.unlinkSync(filePath)

server.listen(filePath)

