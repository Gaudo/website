var guides = require(__APP + 'controllers/guides')

module.exports = [
    { method: 'get',    name: 'home',           pattern: '/',                generator: '/',               middlewares: [], callback:   function(req, res)   { res.redirect('/guide/') } },
    { method: 'get',    name: 'guides-showAll', pattern: '/guide/',          generator: '/guide/',         middlewares: [], callback: guides.showAll },
    { method: 'get',    name: 'guides-show',    pattern: '/guide/:id(\\d+)', generator: '/guide/{id}',     middlewares: [], callback: guides.show },
    { method: 'get',    name: 'guides-addView', pattern: '/guide/aggiungi',  generator: '/guide/aggiungi', middlewares: [], callback: guides.addView },
    { method: 'post',   name: 'guides-add',     pattern: '/guide/',          generator: '/guide/',         middlewares: [], callback: guides.add },
    { method: 'put',    name: 'guides-update',  pattern: '/guide/:id',       generator: '/guide/{id}',     middlewares: [], callback: guides.update },
    { method: 'delete', name: 'guides-delete',  pattern: '/guide/:id',       generator: '/guide/{id}',     middlewares: [], callback: guides.delete }
]
