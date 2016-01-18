'use strict'

var slug = require(__CORE + 'utils').slug
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
    function (request, response)
    {
        var sql = 'SELECT title, bodyHtml as body FROM guides WHERE id = ?'
        db.get(sql, [request.params.id],
            function (err, row)
            {
                if(err)
                    throw err

                var slugTitle = slug(row.title)

                if(request.params.title === undefined || request.params.title !== slugTitle)
                    return response.redirect('/guide/'+request.params.id +'/'+slugTitle)

                response.render('guides/show', {'guide': row})
            }
        )
    }

