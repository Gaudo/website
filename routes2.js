var router = require('express').Router({'caseSensitive': true, 'strict': true})
var middlewares = require('./middlewares')
var staticController = require('./controllers/statics')
// var guidesController = require('./controllers/guides')

var disableQueryString = middlewares.disableQueryString
router.use(middlewares.redirectToLowercase)

router.get('/', disableQueryString, staticController.home)
router.get('/competenze', disableQueryString, staticController.skills)
router.get('/chi-sono',   disableQueryString, staticController.aboutMe)

/*
router.get('/guide/', guidesController.showAll)
router.get('/guide/:id', disableQueryString, guidesController.show)
router.post('/guide/', disableQueryString, guidesController.delete)
router.put('/guide/:id', disableQueryString, guidesController.edit)
*/


module.exports = [
    { name : "index", pattern : "/", middlewares: [], callback : MyViews.Index },
    { name : "index", pattern : "/", callback : MyViews.Index, middlewares: [] },
    { name : "index", pattern : "/", callback : MyViews.Index, middlewares: [] },
]
