var staticController = require('./controllers/statics')
var middlewares = require('./middlewares')

var disableQueryString = middlewares.disableQueryString

module.exports = [
    { method: 'get', name: 'index', pattern: '/', generator: '/', middlewares: [disableQueryString], callback: staticController.home }
]
