import * as dao from 'APP/daos/GaudoDao';

export class StaticGaudoDao implements dao.GaudoDao {
    public async getYears() : Promise<number>
    {
        const birthday : Date = await this.getBirthday();

        const birthdate: {day: number, month: number, year: number} = {
            day: birthday.getDate(),
            month: (birthday.getMonth() + 1),
            year: birthday.getFullYear()
        };

        const todayDate: Date = new Date();
        const today : {day: number, month: number, year: number} = {
            day: todayDate.getDate(),
            month: todayDate.getMonth() + 1,
            year: todayDate.getFullYear()
        };

        const years : number =
            (today.month < birthdate.month ||
            (today.month === birthdate.month &&
            today.day < birthdate.day)) ?
                    today.year - birthdate.year - 1 :
                    today.year - birthdate.year;

        return new Promise<number>(
            (resolve : Function, reject: Function) : void => {
                return resolve(years);
            }
        );
    }

    public async getBirthday() : Promise<Date>
    {
        return new Promise<Date>(
            (resolve: Function, reject: Function) : void => {
                resolve(new Date(1990, 11, 12)); // Actually 1990-12-12
            }
        );
    }

}

/* HELPER FUNCTIONS BELOW */
