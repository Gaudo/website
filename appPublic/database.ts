import * as sqlite3 from 'sqlite3';
sqlite3.verbose();

const db : sqlite3.Database =
    new sqlite3.Database('../database.sqlite',
        sqlite3.OPEN_READONLY,
        (err: any) =>
        {
            if (err) {
                throw err;
            }
        }
);

export const all : {
    (
        sql: string,
        callback?: (err: Error, rows: any[]) => void
    ): sqlite3.Database;
    (
        sql: string,
        params: any,
        callback?: (err: Error, rows: any[]) => void
    ): sqlite3.Database;
    (
        sql: string,
        ...params: any[]
    ): sqlite3.Database;
} = db.all;

export const get : {
    (sql: string, callback?: (err: Error, row: any) => void): sqlite3.Database;
    (sql: string, params: any, callback?: (err: Error, row: any) => void)
    : sqlite3.Database;
    (sql: string, ...params: any[]): sqlite3.Database;
} = db.get;

export const run : any = db.run;