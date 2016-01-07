var guidesController = require(__APP + 'controllers/guides')

module.exports = [
    { method: 'get',
      name: 'guidesShowAll',
      pattern: '/guide/',
      generator: '/guide/',
      callback: guidesController.showAll
    },

    { method: 'get',
      name: 'guidesShow',
      pattern: '/guide/:id',
      generator: '/guide/{id}',
      callback: guidesController.show
    },

    { method: 'post',
      name: 'guidesAdd',
      pattern: '/guide/',
      generator: '/guide/',
      callback: guidesController.add
    },

    { method: 'delete',
      name: 'guidesDelete',
      pattern: '/guide/:id',
      generator: '/guide/{id}',
      callback: guidesController.delete
    }
]
