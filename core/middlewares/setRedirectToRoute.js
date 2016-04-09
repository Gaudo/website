var createRouteToUrl = require(__CORE + 'helpers/createRouteToUrl')

module.exports = function(routes)
{
    var routeToUrl = createRouteToUrl(routes)
    
    function redirectToRoute(request, response, next)
    {
        response.redirectToRoute =
            function redirectToRoute(status, name, params)
            {
                response.redirect(status, routeToUrl(name, params))
            }
        
        next()
    }
    
    return redirectToRoute
}
    
