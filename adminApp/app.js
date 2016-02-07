'use strict'

var Path = require('path')
var Express = require('express')
var Http = require('http')
var Filesystem = require('fs')
var BodyParser = require('body-parser')

var SOCKET_DIR = '/tmp/gaudo-net'
var SOCKET_NAME = 'admin.sock'

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP || global.__MIDDLEWARES || global.__HELPERS

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP = Path.join(__ROOT, 'appAdmin/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')
global.__MIDDLEWARES = Path.join(__ROOT, 'middlewares/')
global.__HELPERS = Path.join(__ROOT, 'helpers/')

var app = Express()
var registerClosingEvents = require(__CORE + 'registerClosingEvents')
var redirectTrailingSlash = require(__MIDDLEWARES + 'redirectTrailingSlash')
var setXhtmlMime = require(__MIDDLEWARES + 'setXhtmlMime')
var routeToUrl = require(__HELPERS + 'routeToUrl')
var addToRouter = require(__CORE + 'addToRouter')(app)
var routes = require(__APP + 'controllers/')
require(__LIBS + 'Date')

app.set('strict routing', true)
app.set('case sensitive routing', true)
app.set('view engine', 'jade');
app.set('views', Path.join(__dirname, 'views'));

app.use(BodyParser.json())
app.use(setXhtmlMime)
routes.forEach(addToRouter)
app.locals.routeToUrl = routeToUrl(routes)
app.use(redirectTrailingSlash)
app.use(
    function (req, res)
    {
        res.status(404).render('errors/404')
    }
)

var server = Http.createServer(app)
server.on('listening', registerClosingEvents(server))

var socketPath = Path.join(SOCKET_DIR, SOCKET_NAME)

if(!Filesystem.existsSync(SOCKET_DIR))
    Filesystem.mkdirSync(SOCKET_DIR, 755)

server.listen(socketPath)

