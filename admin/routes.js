var guidesController = require(__APP + 'controllers/guides')

module.exports = [
    { method: 'get',
      name: 'home',
      pattern: '/',
      generator: '/',
      middlewares: [],
      callback:
        function(req, res)
        {
            res.redirect('/guide/')
        }
    },

    { method: 'get',
      name: 'guides-showAll',
      pattern: '/guide/',
      generator: '/guide/',
      middlewares: [],
      callback: guidesController.showAll
    },

    { method: 'get',
      name: 'guides-show',
      pattern: '/guide/:id(\\d+)',
      generator: '/guide/{id}',
      middlewares: [],
      callback: guidesController.show
    },

    { method: 'get',
      name: 'guides-addView',
      pattern: '/guide/aggiungi',
      generator: '/guide/aggiungi',
      middlewares: [],
      callback: guidesController.addView
    },

    { method: 'post',
      name: 'guides-add',
      pattern: '/guide/',
      generator: '/guide/',
      middlewares: [],
      callback: guidesController.add
    },

    { method: 'put',
      name: 'guides-update',
      pattern: '/guide/:id',
      generator: '/guide/{id}',
      middlewares: [],
      callback: guidesController.update
    },

    { method: 'delete',
      name: 'guides-delete',
      pattern: '/guide/:id',
      generator: '/guide/{id}',
      middlewares: [],
      callback: guidesController.delete
    }
]
