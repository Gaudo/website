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

describe('public', function() {
    describe('#Application(routes)', function () {
        var createApplication = require(__APP + 'createApplication')
        var app = createApplication([])

        it('unknown path should return "application/xhtml+xml" 404', function () {
            request(app)
              .get('/whatever')
              .expect('Content-Type', "application/xhtml+xml")
              .expect(404)
              .end(function(err, res){
                if (err) throw err;
              })
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

        var app = createApplication(routes)
        it('valid GET path should return "application/xhtml+xml" 200', function () {
            request(app)
              .get('/')
              .expect('Content-Type', "application/xhtml+xml")
              .expect(200)
              .end(function(err, res){
                if (err) throw err;
              })
        });
    })
})
