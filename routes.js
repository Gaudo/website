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
        regex: /^\/chi-sono$/,
        allowQueryString: false,

        name: 'about_me',
        generator: '/chi-sono',

        callback:
            function(request, response, params)
            {
                var birthday = {year: 1990, month: 12, day: 12}
                var today = new Date()
                var today = {year: today.getFullYear(), month: today.getMonth()+1, day: today.getDate()}
                var years = today.year - birthday.year
                if(today.month < birthday.month || (today.month === birthday.month && today.day < birthday.day))
                    --years

                response.render('about_me.jade', {'years': years})
            }
    },

    {
        method: 'get',
        regex: /^\/competenze$/,
        allowQueryString: false,

        name: 'skills',
        generator: '/competenze',

        callback:
            function(request, response, params)
            {
                response.render('skills.jade')
            }
    }
]

