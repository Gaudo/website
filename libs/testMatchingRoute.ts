/*
    Code snippet taken & modified from https://github.com/ericf/express-slash
    Copyright (c) 2013 by Eric Ferraiuolo (eferraiuolo@gmail.com). All rights reserved.
*/

'use strict';

module.exports = testStackForMatch;

function testStackForMatch(stack, method, path) {
    return stack.some(function (layer) {
        var route    = layer.route,
            subStack = layer.handle.stack;

        // It's only a match if the stack layer is a route.
        if (route) {
            return route.methods[method] && layer.match(path);
        }

        if (subStack) {
            // Trim any `.use()` prefix.
            if (layer.path) {
                path = trimPrefix(path, layer.path);
            }

            // Recurse into nested apps/routers.
            return testStackForMatch(subStack, method, path);
        }

        return false;
    });
}

function trimPrefix(path, prefix) {
    var charAfterPrefix = path.charAt(prefix.length);

    if (charAfterPrefix === '/' || charAfterPrefix === '.') {
        path = path.substring(prefix.length);

        if (path.charAt(0) !== '/') {
            path = '/' + path;
        }
    }

    return path;
}
