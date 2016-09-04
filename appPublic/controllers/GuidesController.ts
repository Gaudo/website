export interface GuidesController {
    show(req: any, res : any, next : Function): Promise<void>;
    showAll(req: any, res : any, next : Function): Promise<void>;
}