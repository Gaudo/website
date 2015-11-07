'use strict'

require('dotenv').load()

var express = require('express')
var router = require('./router')
var app = express()

app.enable('case sensitive routing')
app.enable('strict routing')
app.set('view engine', 'jade')

app.use(router(app.get('case sensitive routing'), app.get('strict routing')))

app.listen(3000, 'localhost')
