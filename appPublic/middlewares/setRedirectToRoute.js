var createRouteToUrl = require(__CORE + 'helpers/createRouteToUrl')

module.exports = function(routes)
{
    var routeToUrl = createRouteToUrl(routes)
    
    function redirectToRoute(request, response, next)
    {
        response.redirectToRoute =
            function redirectToRoute(name, params)
            {
                response.redirect(routeToUrl(name, params))
            }
        
        next()
    }
    
    return redirectToRoute
}
    
