'use strict'

var utils = require('./utils')

module.exports = function RouteCollection() {

    this.addGet =
        function (name, path, callback)
        {  
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_array(path)

            var route = create_route(name, path, 'get', callback)
            routes_.push(route)
        }

    this.addHead =
        function (name, path, callback)
        {  
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_regexp(path)

            var route = create_route(name, path, 'head', callback)
            routes_.push(route)
        }

    this.addPost =
        function (name, path, callback)
        {  
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_regexp(path)

            var route = create_route(name, path, 'post', callback)
            routes_.push(route)
        }

    this.addPut =
        function (name, path, callback)
        {  
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_regexp(path)

            var route = create_route(name, path, 'put', callback)
            routes_.push(route)
        }

    this.addDelete =
        function (name, path, callback)
        {  
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_regexp(path)

            var route = create_route(name, path, 'delete', callback)
            routes_.push(route)
        }

    this.assign =
        function (path, routes)
        {         
            utils.assert_notEmptyString(name)

            if(!(routes instanceof RouteCollection))
                throw new Error('Not a RouteCollection')

            for (var route in routes.getRoutes()) {
                route.path = path + route.path
                routes_.push(route)
            }
        }

    this.getRoutes =
        function ()
        {
            return routes_
        }

    var create_route =
        function(name, path, method, callback)
        {
            utils.assert_function(callback)
            utils.assert_notEmptyString(name)
            utils.assert_notEmptyString(method)
            utils.assert_regexp(path)

            return {'name': name, 'path': path, 'callback': callback, 'method': method}         
        }

    var routes_ = []
}
