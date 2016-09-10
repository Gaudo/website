namespace util {

    export function assert(param : boolean) : void
    {
        if (param === false) {
            throw new Error('Assertion failed');
        }
    }

    export function assertInt(param : number) : void
    {
        if (param % 1 !== 0) {
            throw new Error('Assertion failed: Not an integer');
        }
    }

    export function assertInvalid(param : Object) : void
    {
        if (param === (undefined || null)) {
            throw new Error('Assertion failed: Invalid Object');
        }
    }
}
