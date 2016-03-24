'use strict'

var Path = require('path')
var Assert = require('assert');
var request = require('supertest')

var globalsDefined = global.__ROOT || global.__LIBS || global.__CORE || global.__APP

if(globalsDefined)
    throw new Error('ERROR: GLOBALS ALREADY EXIST!!')

global.__ROOT = Path.dirname(__dirname) + '/'
global.__APP = Path.join(__ROOT, 'publicApp/')
global.__LIBS = Path.join(__ROOT, 'libs/')
global.__CORE = Path.join(__ROOT, 'core/')


describe('#checking routes', function () {
    var createApplication = require(__APP + 'helpers/createApplication')

    it('unknown GET path should return "application/xhtml+xml" 404', function (done) {
        var app = createApplication([])
        request(app)
          .get('/whatever')
          .expect('Content-Type', "application/xhtml+xml")
          .expect(404, done)
    })


    it('known GET path should return "application/xhtml+xml" 200', function (done) {
        var routes = [
            { method: 'get',
              name: 'home',
              pattern: '/a',
              generator: '/',
              middlewares: [],
              callback: function(req, res) { res.end() }
            }
        ]

        var app = createApplication(routes)
        request(app)
          .get('/a')
          .expect('Content-Type', "application/xhtml+xml")
          .expect(200, done)
    })

    it('known GET path without trailing slash should redirect to path with slash', function (done) {

        var routes = [
            { method: 'get',
              name: 'home',
              pattern: '/asd/',
              generator: '/',
              middlewares: [],
              callback: function(req, res) { res.end() }
            }
        ]

        var app = createApplication(routes)
        request(app)
          .get('/asd')
          .expect(301)
          .expect('Location', '/asd/', done)
    })

    it('known GET path with trailing slash should redirect to path without slash', function (done) {

        var routes = [
            { method: 'get',
              name: 'home',
              pattern: '/asd',
              generator: '/',
              middlewares: [],
              callback: function(req, res) { res.end() }
            }
        ]

        var app = createApplication(routes)
        request(app)
          .get('/asd/')
          .expect(301)
          .expect('Location', '/asd', done)
    })

    it('GET path with uppercase should redirect to path in lowercase', function (done) {

        var routes = [
            { method: 'get',
              name: 'home',
              pattern: '/aaaa',
              generator: '/',
              middlewares: [],
              callback: function(req, res) { res.end() }
            }
        ]

        var app = createApplication(routes)
        request(app)
          .get('/AaaA')
          .expect(301)
          .expect('Location', '/aaaa', done)
    })
})
