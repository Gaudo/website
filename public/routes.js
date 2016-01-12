var staticController = require(__APP + 'controllers/statics')
var guidesController = require(__APP + 'controllers/guides')

var middlewares = require(__CORE + 'middlewares')

var disableQueryString = middlewares.disableQueryString

var staticRoutes = [
    { method: 'get',
      name: 'home',
      pattern: '/',
      generator: '/',
      middlewares: [disableQueryString],
      callback: staticController.home
    },

    { method: 'get',
      name: 'aboutMe',
      pattern: '/chi-sono',
      generator: '/chi-sono',
      middlewares: [disableQueryString],
      callback: staticController.aboutMe
    },

    { method: 'get',
      name: 'skills',
      pattern: '/competenze',
      generator: '/competenze',
      middlewares: [disableQueryString],
      callback: staticController.skills
    }
]

var guidesRoutes = [

    { method: 'get',
      name: 'guides',
      pattern: '/guide/',
      generator: '/guide/',
      middlewares: [],
      callback: guidesController.showAll
    },

    { method: 'get',
      name: 'guide',
      pattern: '/guide/:id/:title',
      generator: '/guide/{id}/{title}',
      middlewares: [disableQueryString],
      callback: guidesController.show
    }

]

module.exports = staticRoutes.concat(guidesRoutes)
