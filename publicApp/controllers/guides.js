var parseUrl = require('url').parse

var toSlug = require(__CORE + 'helpers/toSlug')
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
        var sql = 'SELECT title, bodyHtml as body, created, modified FROM guides WHERE id = ?'
        db.get(sql, [request.params.id],
            function (err, row)
            {
                if(err)
                    throw err              

                if(row === undefined)
                    return next();

                row.created = new Date(row.created + ' UTC')

                if(row.modified !== null)
                    row.modified = new Date(row.modified + ' UTC')

                var slugTitle = toSlug(row.title)

                if(request.params.title === undefined || request.params.title !== slugTitle)
                    return response.redirect('/guide/'+request.params.id +'/'+slugTitle)

                response.render('guides/show', {'guide': row})
            }
        )
    }

