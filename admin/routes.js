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
      name: 'guidesShowAll',
      pattern: '/guide/',
      generator: '/guide/',
      middlewares: [],
      callback: guidesController.showAll
    },

    { method: 'get',
      name: 'guidesShow',
      pattern: '/guide/:id(\\d+)',
      generator: '/guide/{id}',
      middlewares: [],
      callback: guidesController.show
    },

    { method: 'get',
      name: 'guidesAddView',
      pattern: '/guide/aggiungi',
      generator: '/guide/aggiungi',
      middlewares: [],
      callback: guidesController.addView
    },

    { method: 'post',
      name: 'guidesAdd',
      pattern: '/guide/',
      generator: '/guide/',
      middlewares: [],
      callback: guidesController.add
    },

    { method: 'delete',
      name: 'guidesDelete',
      pattern: '/guide/:id',
      generator: '/guide/{id}',
      middlewares: [],
      callback: guidesController.delete
    }
]
