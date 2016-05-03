var parseUrl = require('url').parse

var toSlug = require(__CORE + 'helpers/toSlug')
var guidesDao = require(__APP + 'daos/guidesDao') 

module.exports.showAll = showAll
module.exports.show = show

function showAll(request, response)
{      
    guidesDao.showAll().then(
        function(guides)
        {
            response.render('guides/index', {'guides': guides})
        },

        function (err)
        {
            return next(err)
        }
    )
}

function show(request, response, next)
{
    guidesDao.show(parseInt(request.params.id)).then(
        function (guide)
        {
            if(guide === null)
                return next(404)

            var slugTitle = toSlug(guide.title)
            if(request.params.title === undefined || request.params.title !== slugTitle)
                return response.redirectToRoute(301, 'guides-show', {'id': id, 'title': slugTitle})

            response.render('guides/show', {'guide': guide})
        },

        function (err)
        {
            return next(err)
        }
    )
}

