import { SqlStatement } from 'APP/repositories/common/SqlStatement';

export abstract class GuideCommand implements SqlStatement {
    protected readonly TABLE : string = '';
    protected readonly FIELD1 : string = '';
    protected readonly FIELD2 : string = '';
    protected readonly FIELD3 : string = '';

    public abstract sql() : string;
}