'use strict'

var Path = require('path')
var Assert = require('assert');
var Util = require('util')
var request = require('supertest')

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP_PUBLIC || global.__APP_ADMIN || global.__MIDDLEWARES || global.__HELPERS

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP_PUBLIC = Path.join(__ROOT, 'public/')
global.__APP_ADMIN = Path.join(__ROOT, 'admin/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')
global.__MIDDLEWARES = Path.join(__ROOT, 'middlewares/')
global.__HELPERS = Path.join(__ROOT, 'helpers/')

var Application = require(__CORE + 'Application')

describe('public', function() {
    describe('#Application(routes)', function () {

        var app = new Application([]).getApp()
        it('unknown path should return 404', function () {
            request(app)
              .get('/whatever')
              .expect('Content-Type', /application\/xhtml+xml/)
              .expect(404)
        })

        var routes = [
            {
              method: 'get',
              name: 'home',
              pattern: '/',
              generator: '/',
              middlewares: [],
              callback: function(req, res) { res.end() }
            }
        ]

        var app = new Application(routes).getApp()
        it('valid GET path should return 200', function () {
            request(app)
              .get('/')
              .expect('Content-Type', /application\/xhtml+xml/)
              .expect(200)
        });
    })
})
