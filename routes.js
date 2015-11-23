'use strict'

module.exports = [
    {
        method: 'get',
        regex: /^\/$/,
        allowQueryString: false,

        name: 'home',
        generator: '/',

        callback:
            function(params, request, response)
            {
                response.render('views/index.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/curriculum$/,
        allowQueryString: false,

        name: 'curriculum',
        generator: '/curriculum',

        callback:
            function(params, request, response)
            {
                response.render('views/curriculum.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/progetti$/,
        allowQueryString: false,

        name: 'projects',
        generator: '/progetti',

        callback:
            function(params, request, response)
            {
                response.render('views/projects.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/chi-sono$/,
        allowQueryString: false,

        name: 'about_me',
        generator: '/chi-sono',

        callback:
            function(params, request, response)
            {
                response.render('views/about_me.jade')
            }
    }
]

