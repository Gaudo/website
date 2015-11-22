'use strict'

module.exports = [
    {
        method: 'get',
        regex: /^\/guide\/(\d+)(?:\/([a-zA-Z0-9-]+))?$/,
        allowQueryString: false,

        name: 'showGuide',
        generator: '/guide/{id}/{title}',

        callback:
            function(params, request, response)
            {
                response.render('views/index.jade')
            }
    },

    {
        method: 'get',
        regex: /^\/guide\/$/,
        allowQueryString: false,

        name: 'guides',
        generator: '/guide',

        callback:
            function(params, request, response)
            {
                response.end()
            }
    }
]

