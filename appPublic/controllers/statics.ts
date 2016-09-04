import guidesDao = require('APP/daos/guidesDao')
import gaudoDao = require('APP/daos/gaudoDao')

export function home(request: any, response: any, next: Function)
{
    guidesDao.showAllLimit(3).then(
        function (guides) { response.render('index', {'guides': guides}) },
        function (err) { next(err) }
    )
}

export function skills(request: any, response: any)
{
    response.render('skills')
}


export function aboutMe(request: any, response: any, next: Function)
{
    gaudoDao.getAge().then(
        function (years: number) { response.render('about_me', {'years': years}) },
        function (err: any) { next(err) }
    )
}

export function privacy(request: any, response: any)
{
    response.render('privacy_policy')
}
