export class Guide {
    public constructor(
        private idAttribute : number,
        private titleAttribute : string,
        private bodyAttribute : string,
        private createdAttribute : Date,
        private modifiedAttribute? : Date
    )
    {
        util.assertInvalid(idAttribute);
        util.assertInt(idAttribute);
        util.assertInvalid(titleAttribute);
        util.assertInvalid(bodyAttribute);
        util.assertInvalid(createdAttribute);
    }

    public get title() : string
    {
        return this.titleAttribute;
    }

    public get body() : string
    {
        return this.bodyAttribute;
    }

    public get created() : Date
    {
        return this.createdAttribute;
    }

    public get modified() : Date
    {
        return this.modifiedAttribute;
    }
}