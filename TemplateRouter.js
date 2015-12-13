var Jade = require('jade')
var Path = require('path')
var UrlGenerator = require('./UrlGenerator')

module.exports = 
    function (jadeOptions, routes)
    {
        this.render =
            function (filePath, locals)
            {
                var urlGenerator = new UrlGenerator(routes)
                locals = locals || {}
                locals.getRouteUrl = urlGenerator.generate
                var fn = Jade.compileFile(Path.join(views, filePath), jadeOptions)
                return fn(locals)

            }
    }
