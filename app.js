'use strict'

var SOCKET_DIR = '/tmp/gaudo-net'
var SOCKET_NAME = 'default.sock'

var Express = require('express')
var Http = require('http')
var Filesystem = require('fs')
var Path = require('path')

var registerClosingEvents = require('./registerClosingEvents')
var initApp = require('./initApp')

var app = Express()

initApp(app)

var server = Http.createServer(app)

server.on('listening', registerClosingEvents(server))

var socketPath = Path.join(SOCKET_DIR, SOCKET_NAME)

if(!Filesystem.existsSync(SOCKET_DIR))
    Filesystem.mkdirSync(SOCKET_DIR, 755)

server.listen(socketPath)

