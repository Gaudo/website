'use strict'

var utils = require('./utils')


module.exports =
    function (routes)
    {
        this.generate =
            function (name, params) 
            {
                params = params || {}
                var url

                var result = routes.some(
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
    }

