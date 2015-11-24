'use strict'

module.exports = [
    {
        method: 'get',
        regex: /\/.*/,
        allowQueryString: true,

        callback:
            function(request, response)
            {
                var UrlClass = require('url')
                var parsedUrl = UrlClass.parse(request.url)
                var upperCaseFound = /[A-Z]/g.test(parsedUrl.path)

                if(upperCaseFound) {
                    response.redirect(parsedUrl.path.toLowerCase())
                    return false
                }

                return true
            }
    },

    {
        method: 'get',
        regex: /^\/$/,
        allowQueryString: false,

        name: 'home',
        generator: '/',

        callback:
            function(request, response, params)
            {
                response.render('index.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/curriculum$/,
        allowQueryString: false,

        name: 'curriculum',
        generator: '/curriculum',

        callback:
            function(request, response, params)
            {
                response.render('curriculum.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/progetti$/,
        allowQueryString: false,

        name: 'projects',
        generator: '/progetti',

        callback:
            function(request, response, params)
            {
                response.render('projects.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/chi-sono$/,
        allowQueryString: false,

        name: 'about_me',
        generator: '/chi-sono',

        callback:
            function(request, response, params)
            {
                response.render('about_me.jade')
            }
    }
]

