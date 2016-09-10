import { GuidesRepository } from 'APP/repositories/GuidesRepository';
import { Guide } from 'APP/domain/Guide';

export class GuidesController {

    public constructor(private guidesRepository : GuidesRepository)
    {}

    public async showAll(request: any, response: any, next : () => void)
        : Promise<void>
    {
        const guides: any = await this.guidesRepository.showAll();
        response.render('guides/index', {'guides': guides});
    }

    public async show(request: any, response: any, next: (data : any) => void)
        : Promise<void>
    {
        const optionalGuide : util.Optional<Guide> =
            await this.guidesRepository.show(
                parseInt(request.params.id, 10)
        );

        optionalGuide.ifPresentElse(
            (guide: any) : void =>
            {
                const slugTitle : string = toSlug(guide.title);
                if (request.params.title === undefined ||
                    request.params.title !== slugTitle) {
                    return response.redirectToRoute(301, 'guides-show',
                        {'id': request.params.id, 'title': slugTitle});
                }

                response.render('guides/show', {'guide': guide});
            },

            () : void =>
            {
                next(404);
            }
        );
    }
}