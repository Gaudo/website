'use strict'

var parseUrl = require('url').parse

var db = require(__APP + 'database') 

module.exports.index =
    function (request, response)
    {
 /*       var page = parseURL(request.url, true).query.page

        if(!Number.isInteger(page) || page < 1)
            response.redirect('')
*/
        var sql = 'SELECT * FROM guides'
        db.all(sql, [],
            function (err, rows)
            {
                if(err)
                    throw err;
            
                response.render('guides/index', {'guides': rows})
            }
        )
    }

module.exports.show =
    function (request, response, next)
    {

    }
