'use strict'

var routes = []

routes.push({
    method: 'get',
    name: 'showGuide',
    pattern: /^\/guide\/(\d+)(?:\/([a-zA-Z0-9-]+))?/,
    generator: '/guide/{id}/{title}',

    callback:
        function(params, request, response)
        {
            if(params[1] === undefined) {
                return
            }

            response.end()
        }
})

routes.push({
    method: 'get',
    name: 'addGuide',
    pattern: /^\/guide\/(\d+)(?:\/([a-zA-Z0-9-]+))?/,
    generator: '/addguide/{id}/{title}',

    callback:
        function(params, request, response)
        {
            if(params[1] === undefined) {
                return
            }

            response.end()
        }
})

module.exports = routes
