'use strict';

import { toSlug } from 'CORE/helpers/toSlug';
import { GuidesDao } from 'APP/daos/GuidesDao';

export class GuidesController {

    public constructor(private guidesDao : GuidesDao)
    {}

    public async showAll(request: any, response: any, next : () => void)
        : Promise<void>
    {
        const guides: any = await this.guidesDao.showAll();
        response.render('guides/index', {'guides': guides});
    }

    public async show(request: any, response: any, next: (data : any) => void)
        : Promise<void>
    {
        const optionalGuide : util.Optional<any> = await this.guidesDao.show(
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