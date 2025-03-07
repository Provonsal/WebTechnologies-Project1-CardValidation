export default class DefaultValidators {

    static IsUndefined(smth) {
        return smth === undefined;
    };

    static all(iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (!iterable[index]) return false;
        }
        return true;
    }

    static any(iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (iterable[index]) return true;
        }
        return false;
    }

    static IsNonDigitInside(string) {
        const result = RegExp(/\D/gm).exec(string);

        return (result != null);
    }

}
