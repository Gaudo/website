var Utils = require('./utils')
var routes = require('./routes')

function route(name, params)
{
    var generator
    routes.some(
        function (element)
        {
            if (element.name !== name)
                return false
            
            generator = element.generator
            return true
        }
    )

    for(var key in params) {
        var value = Utils.slug(params[key])
        generator = generator.replace('{'+key+'}', value)
    }

    return generator
}

module.exports.route = route
