module.exports = router = require('express').Router();

router.get(/^\/chi-sono$/, function (request, response) {
        response.render('chi_sono');
});

router.get(/^\/curriculum-vitae$/, function (request, response) {

});

router.get(/^\/$/, function (request, response) {
    response.render('index.jade', {});
});

