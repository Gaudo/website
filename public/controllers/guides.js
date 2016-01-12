'use strict'

var parseUrl = require('url').parse

var db = require(__APP + 'database') 

module.exports.showAll =
    function (request, response)
    {
        var sql = 'SELECT * FROM guides'
        db.all(sql, [],
            function (err, rows)
            {
                if(err)
                    throw err
            
                response.render('guides/index', {'guides': rows})
            }
        )
    }

module.exports.show =
    function (request, response, next)
    {
        var sql = 'SELECT * FROM guides WHERE id = ?'
        db.get(sql, [request.params.id],
            function (err, row)
            {
                if(err)
                    throw err
                console.log(row)
                response.render('guides/index', {'guides': row})
            }
        )
    }

