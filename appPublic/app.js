'use strict'

var Path = require('path')
var Http = require('http')
var Filesystem = require('fs')

var SOCKET_DIR = '/tmp/gaudo-net'
var SOCKET_NAME = 'default.sock'

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP || global.__MIDDLEWARES || global.__HELPERS

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP_PUBLIC = Path.join(__ROOT, 'appPublic/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')
global.__MIDDLEWARES = Path.join(__ROOT, 'middlewares/')
global.__HELPERS = Path.join(__ROOT, 'helpers/')

require(__LIBS + 'Date')
var registerClosingEvents = require(__CORE + 'registerClosingEvents')
var Application = require(__CORE + 'Application')
var routes = require(__APP_PUBLIC + 'controllers/')

var app = new Application(routes).getApp()

var server = Http.createServer(app)
server.on('listening', registerClosingEvents(server))

var socketPath = Path.join(SOCKET_DIR, SOCKET_NAME)

if(!Filesystem.existsSync(SOCKET_DIR))
    Filesystem.mkdirSync(SOCKET_DIR, 755)

server.listen(socketPath)

