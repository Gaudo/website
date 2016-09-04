export interface GuidesDao {
    showAll(params? : {limit?: number }) : Promise<any>;
    show(id : number) : Promise<any>;
}