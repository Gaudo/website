'use strict'

var Marked = require('marked')
var renderer = new Marked.Renderer();
renderer.br =
    function()
    {
        return "<br />"
    }

Marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});


var parseUrl = require('url').parse

var db = require(__APP + 'database') 

module.exports.showAll =
    function (request, response)
    {
        var sql = "SELECT id, title, created, modified FROM guides"
        var rows = []

        db.each(sql, [],
            function (err, row)
            {
                if(err)
                    throw err

                row.created = new Date(row.created + ' UTC')

                if(row.modified !== null)
                    row.modified = new Date(row.modified + ' UTC')

                rows.push(row)
            },

            function (err, numRows)
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

                response.render('guides/show', {'guide': row})
            }
        )
    }


module.exports.add =
    function (request, response, next)
    {
        request.body.title = request.body.title.trim()

        if(request.body.title.length === 0)
            return response.status(500).end()

        var sql = "INSERT INTO guides(title, body, bodyHtml, created, modified) values (?, ?, ?, CURRENT_TIMESTAMP, NULL)"
        db.run(sql, [request.body.title, request.body.body, Marked(request.body.body)],
            function(err)
            {
                if(err) {
                    console.log(err)
                    return response.status(500).end()
                }

                return response.status(201).end()
            }       
        )

    }

module.exports.addView =
    function (request, response, next)
    {
        response.render('guides/addView')
    }

module.exports.update =
    function (request, response, next)
    {
        var sql = "UPDATE guides SET title=?, body=?, bodyHtml=?, modified=CURRENT_TIMESTAMP WHERE id=?"
        db.run(sql, [request.body.title, request.body.body, Marked(request.body.body), request.params.id],
            function(err)
            {
                if(err) {
                    console.log(err)
                    return response.status(500).end()
                }
                return response.status(204).end()
            }       
        )

    }

module.exports.delete =
    function (request, response, next)
    {
        var sql = "DELETE FROM guides WHERE id=?"
        db.run(sql, [request.params.id],
            function(err)
            {
                if(err)
                    return response.status(500).end()

                return response.status(204).end()
            }       
        )
    }
