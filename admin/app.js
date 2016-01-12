'use strict'

var SOCKET_DIR = '/tmp/gaudo-net'
var SOCKET_NAME = 'admin.sock'

var Path = require('path')

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP = Path.join(__ROOT, 'admin/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')

var Express = require('express')
var Http = require('http')
var Filesystem = require('fs')

var registerClosingEvents = require(__CORE + 'registerClosingEvents')
var initApp = require(__APP + 'initApp')

var app = Express()

initApp(app)

var server = Http.createServer(app)
server.on('listening', registerClosingEvents(server))

var socketPath = Path.join(SOCKET_DIR, SOCKET_NAME)

if(!Filesystem.existsSync(SOCKET_DIR))
    Filesystem.mkdirSync(SOCKET_DIR, 755)

server.listen(socketPath)

