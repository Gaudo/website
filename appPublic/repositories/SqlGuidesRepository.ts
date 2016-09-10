import { Guide } from 'APP/domain/Guide';
import { GuideQuery } from 'APP/repositories/queries/GuideQuery';
import { GuideCommand } from 'APP/repositories/commands/GuideCommand';

export interface SqlGuidesRepository {
    query(query : GuideQuery) : Promise<Array<Guide>>;
    execute(command : GuideCommand) : Promise<void>;
}
