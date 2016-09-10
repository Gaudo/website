export function createRouteToUrl(routes)
{
    function route(name, params)
    {
        var generator: any;
        routes.some(
            function (element:any)
            {
                if (element.name !== name) {
                    return false;
                }
                
                generator = element.generator;
                return true;
            }
        )

        for(var key in params) {
            var value = params[key];
            if (typeof value === 'string') {
                value = util.toSlug(value);
            }
            generator = generator.replace('{'+key+'}', value);
        }

        return generator;
    }

    return route;
}
