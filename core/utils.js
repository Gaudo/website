'use strict'

module.exports.assert_function =
    function(callback)
    {
        if(typeof callback !== 'function')
            throw new Error('Not a Function.')
    }

var assert_string = module.exports.assert_string =
    function(string)
    {
        if(typeof string !== 'string')
            throw new Error('Not a String.')
    }

var assert_notEmptyString = module.exports.assert_notEmptyString =
    function(string)
    {
        assert_string(string)
        if(string === '')
            throw new Error('Empty string not allowed.')
    }

module.exports.assert_absolutePath =
    function(string)
    {
        assert_notEmptyString(string)
        if(string[0] !== '/')
            throw new Error('Not absolute path.')
    }

module.exports.assert_regexp =
    function(string)
    {
        if(!(string instanceof RegExp))
            throw new Error('Not regexp.')
    }

module.exports.assert_array =
    function(array)
    {
        if(!(array instanceof Array))
            throw new Error('Not array.')
    }

module.exports.escape =
    function (str)
    {
        var characters = ['.', '\\', '+', '$', '[', ']', '(', ')', '*', '?', '{', '}', '=', '!', '<', '>', '|', ':', '-', '/']
        var regex = RegExp('[' + characters.join('\\') + ']', 'g')
        
        return str.replace(regex, '\\$&');
    }

module.exports.slug =
    function (str)
    {
        return str.replace(/([^a-z0-9])/gi, '-').toLowerCase()
    }

