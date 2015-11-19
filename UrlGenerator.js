'use strict'

var utils = require('./utils')


var url = module.exports =
    function (routes)
    {
        this.routes = routes
    }

url.prototype.generate =
    function (name, params) 
    {
        var url

        var result = this.routes.some(
            function(route)
            {
                if (route.name !== name)
                    return false

                url = route.generator
                for(var key in params) {
                    var value = utils.slug(params[key])
                    url = url.replace('{'+key+'}', value)
                }
                    
                return true
            }
        )

        if(!result) {
            throw new Error('Route called \''+name+'\' does not exist')
        }
    


        return url
    }

