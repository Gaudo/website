import { Guide } from 'APP/domain/Guide';

export interface GuidesRepository {
    query(specification : GuideSpecification) : Promise<Array<Guide>>;
}
