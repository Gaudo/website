var toSlug = require(__CORE + 'helpers/toSlug');
module.exports =
    function (routes) {
        function route(name, params) {
            var generator;
            routes.some(function (element) {
                if (element.name !== name)
                    return false;
                generator = element.generator;
                return true;
            });
            for (var key in params) {
                var value = params[key];
                if (typeof value === 'string' || value instanceof String)
                    value = toSlug(value);
                generator = generator.replace('{' + key + '}', value);
            }
            return generator;
        }
        return route;
    };
