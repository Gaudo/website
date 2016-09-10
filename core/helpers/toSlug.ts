namespace util {
    export function toSlug(str: string) : string
    {
        return str.replace(/([^a-z0-9])/gi, '-').toLowerCase();
    }
}

