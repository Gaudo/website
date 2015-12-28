'use strict'

var Express = require('express')
var Http = require('http')
var Filesystem = require('fs')
var Path = require('path')
var app = Express()
var router = require('./router')

app.set('strict routing', true)
app.set('case sensitive routing', true)
app.set('view engine', 'jade');

app.locals.getRouteUrl =
    function (name, params)
    {

    }

app.use(router)

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

