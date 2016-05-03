var guidesDao = require(__APP + 'daos/guidesDao')
var gaudoDao = require(__APP + 'daos/gaudoDao')

module.exports.home = home
module.exports.skills = skills
module.exports.aboutMe = aboutMe
module.exports.privacy = privacy

function home(request, response)
{
    guidesDao.showAllLimit(3).then(
        function (guides) { response.render('index', {'guides': guides}) },
        function (err) { next(err) } 
    )
}

function skills(request, response)
{
    response.render('skills')
}


function aboutMe(request, response)
{
    gaudoDao.getAge().then(
        function (years) { response.render('about_me', {'years': years}) },
        function (err) { next(err) }
    )
}

function privacy(request, response)
{
    response.render('privacy_policy')
}
