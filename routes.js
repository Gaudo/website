var staticController = require('./controllers/statics')
var middlewares = require('./middlewares')

var disableQueryString = middlewares.disableQueryString

module.exports = [
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
    },

    { method: 'get',
      name: 'guides',
      pattern: '/guide',
      generator: '/guide',
      middlewares: [disableQueryString],
      callback: function(req, res){res.render('guides')}
    }
]
