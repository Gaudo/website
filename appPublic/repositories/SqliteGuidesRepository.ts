import { SqlGuidesRepository } from 'APP/repositories/SqlGuidesRepository';
import { GuideCommand } from 'APP/repositories/commands/GuideCommand';
import { GuideQuery } from 'APP/repositories/queries/GuideQuery';
import { Guide } from 'APP/domain/Guide';

import * as db from 'APP/database';

export class SqliteGuidesRepository implements SqlGuidesRepository {

    public query(query : GuideQuery)
        : Promise<Array<Guide>>
    {
        return new Promise<Array<Guide>>((
                resolve : (data : any) => void,
                reject : (err : any) => void
                ) =>
            {
                db.each(query.sql(), [],
                    (row: any) =>
                    {
                        row.created = new Date(row.created + ' UTC');

                        if (row.modified !== undefined) {
                            row.modified = new Date(row.modified + ' UTC');
                        }
                    },
                    (err: any, num : number, rows: any) =>
                    {
                        if (err) {
                            return reject(err);
                        }

                        resolve(rows);
                    }
                );
            }
        );
    }

    public execute(command : GuideCommand)
        : Promise<void>
    {
        return new Promise<Array<Guide>>((
                resolve : () => void,
                reject : (err : any) => void
                ) =>
            {
                db.run(command.sql(), [],
                    (err: any) =>
                {
                    if (err) {
                        return reject(err);
                    }

                    resolve();
                });
            }
        );
    }
}

 function showAll( params? : {limit?: number} ) : Promise<any[]>
    {
        if (params.limit === undefined) {
            return new Promise<any[]>(
                (resolve: Function, reject: Function) : void =>
                {
                    let sql : string = 'SELECT * FROM guides';
                    db.all(sql, [],
                        (err: any, rows: any[]) =>
                        {
                            if (err) {
                                return reject(err);
                            }
                            resolve(rows);
                        }
                    );
                }
            );
        }

        if (params.limit <= 0) {
            throw new RangeError('Limit must be a positive value');
        }

        return new Promise<any[]>(
            (resolve: Function, reject: Function) : void =>
            {
                let sql : string = 'SELECT * FROM guides LIMIT ?';
                db.all(sql, [params.limit],
                    (err: any, rows: any[]) =>
                    {
                        if (err) {
                            reject(err);
                        }

                        resolve(rows);
                    }
                );
            }
        );
    }

    function show(id: number) : Promise<any>
    {
        if (id < 0) {
            throw new RangeError('Id must be a non-negative value');
        }

        return new Promise<any>(
            (resolve: Function, reject: Function) : void =>
            {
                let sql : string =
                    'SELECT title, bodyHtml as body, created, ' +
                    'modified FROM guides WHERE id = ?';

                db.get(sql, [id],
                    function (err: any, row: any) : void
                    {
                        if (err) {
                            return reject(err);
                        }

                        if (row === null) {
                            return resolve();
                        }

                        row.created = new Date(row.created + ' UTC');

                        if (row.modified !== undefined) {
                            row.modified = new Date(row.modified + ' UTC');
                        }

                        resolve(row);
                    }
                );
            }
        );
    }