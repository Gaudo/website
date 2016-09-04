class Optional<T> {
    constructor(private element : T) 
    {
        
    }

    private isPresent() : boolean
    {
        return this.element !== undefined;
    }

    public get() : T
    {
        if (!this.isPresent()) {
            throw new Error("No such element.");
        }
        return this.element;
    }
}