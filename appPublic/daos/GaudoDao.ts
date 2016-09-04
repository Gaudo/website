export interface GaudoDao {
    getYears() : Promise<number>;
    getBirthday() : Promise<Date>;
}

/* HELPER FUNCTIONS BELOW */