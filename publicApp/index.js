'use strict'

var SOCKET_DIR = '/tmp/gaudo-net'
var SOCKET_NAME = 'default.sock'

var Path = require('path')
var Http = require('http')
var Filesystem = require('fs')

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP = Path.join(__ROOT, 'publicApp/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')

require(__CORE + 'Date')
var createApplication = require(__APP + 'createApplication')
var routes = require(__APP + 'controllers/')
var registerClosingEvents = require(__CORE + 'registerClosingEvents')

var app = createApplication(routes)
var server = Http.createServer(app)
server.on('listening', registerClosingEvents(server))

var socketPath = Path.join(SOCKET_DIR, SOCKET_NAME)
if(!Filesystem.existsSync(SOCKET_DIR))
    Filesystem.mkdirSync(SOCKET_DIR, 755)

server.listen(socketPath)
    
