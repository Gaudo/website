var statics = require(__APP + 'controllers/statics')
var guides = require(__APP + 'controllers/guides')

var disableQueryString = require(__CORE + 'middlewares/disableQueryString')

module.exports = [
/********** STATICS **********/
{ method: 'get', name: 'home',    pattern: '/',           generator: '/',           middlewares: [disableQueryString], callback: statics.home },
{ method: 'get', name: 'aboutMe', pattern: '/chi-sono',   generator: '/chi-sono',   middlewares: [disableQueryString], callback: statics.aboutMe },
{ method: 'get', name: 'skills',  pattern: '/competenze', generator: '/competenze', middlewares: [disableQueryString], callback: statics.skills },
{ method: 'get', name: 'privacyPolicy',  pattern: '/privacy', generator: '/privacy', middlewares: [disableQueryString], callback: statics.privacy },
/******* STATICS END *********/

/********** GUIDES **********/
{ method: 'get', name: 'guides-showAll', pattern: '/guide/',                  generator: '/guide/',             middlewares: [],                   callback: guides.showAll },
{ method: 'get', name: 'guides-show',    pattern: '/guide/:id(\\d+)/:title?', generator: '/guide/{id}/{title}', middlewares: [disableQueryString], callback: guides.show }
/******* GUIDES END *********/
]
