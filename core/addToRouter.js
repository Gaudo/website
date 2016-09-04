module.exports =
    function (router) {
        function addToRouter(element) {
            var params = [element.pattern];
            element.middlewares.forEach(function (element) {
                params.push(element);
            });
            params.push(element.callback);
            switch (element.method.toLowerCase()) {
                case 'get':
                    router.get.apply(router, params);
                    break;
                case 'put':
                    router.put.apply(router, params);
                    break;
                case 'delete':
                    router.delete.apply(router, params);
                    break;
                case 'post':
                    router.post.apply(router, params);
                    break;
                default:
                    throw new Error('No method called ' + element.method);
            }
        }
        return addToRouter;
    };
