namespace util {
    export class Optional<T> {
        public constructor(private element : T)
        {
            util.assertInvalid(element);
        }

        private isPresent() : boolean
        {
            return this.element !== undefined;
        }

        public ifPresentElse(
            present : (data : T) => void,
            notPresent : () => void
                ): void
        {
            if (this.isPresent()) {
                return present(this.element);
            }

            return notPresent();
        }
    }
}