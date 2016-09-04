import { GuidesDao } from 'APP/daos/GuidesDao';
import * as db from 'APP/database';

export class SqliteGuidesDao implements GuidesDao {
    public showAll( params? : {limit?: number} ) : Promise<any[]>
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

    public show(id: number) : Promise<any>
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
}