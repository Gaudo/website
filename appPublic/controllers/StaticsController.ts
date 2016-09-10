import { GuidesRepository} from 'APP/repositories/GuidesRepository';
import { GaudoRepository } from 'APP/repositories/GaudoRepository';

export class StaticsController {
    public home(request: any, response: any, next: Function)
    {
        guidesDao.showAllLimit(3).then(
            function (guides) { response.render('index', {'guides': guides}); },
            function (err) { next(err); }
        )
    }

    public skills(request: any, response: any)
    {
        response.render('skills');
    }


    public aboutMe(request: any, response: any, next: Function)
    {
        gaudoDao.getAge().then(
            function (years: number)
            {
                response.render('about_me', {'years': years});
            },

            function (err: any) { next(err); }
        )
    }

    public privacy(request: any, response: any)
    {
        response.render('privacy_policy');
    }

}