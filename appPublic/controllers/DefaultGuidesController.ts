'use strict';

import { toSlug } from 'CORE/helpers/toSlug';
import { Optional } from 'LIBS/Optional';
import { GuidesDao } from 'APP/daos/GuidesDao';
import { GuidesController } from 'APP/controllers/GuidesController';

export class DefaultGuidesController implements
        GuidesController {

    public constructor(private guidesDao : GuidesDao)
    {}

    public async showAll(request: any, response: any, next : Function)
        : Promise<void>
    {
        const guides: any = await this.guidesDao.showAll();
        response.render('guides/index', {'guides': guides});
    }

    public async show(request: any, response: any, next: Function)
        : Promise<void>
    {
        const optionalGuide : Optional<any> = await this.guidesDao.show(
            parseInt(request.params.id, 10)
        );

        try {
            const guide : Optional<any> = optionalGuide.get();
            const slugTitle : string = toSlug(guide.title);
            if (request.params.title === undefined ||
                request.params.title !== slugTitle) {
                return response.redirectToRoute(301, 'guides-show',
                    {'id': request.params.id, 'title': slugTitle});
            }

            response.render('guides/show', {'guide': guide});
        }
        catch (missing: Error) {
            return next(404);
        }
    }
}