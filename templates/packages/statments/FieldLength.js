import ExpressionStatment from "./ExpressionStatment.js";

export default class FieldLength extends ExpressionStatment {

    #Length;

    Check(length) {
        return length < this.#Length;
    }

    constructor(Len) {
        super();
        this.#Length = Len;
    }
}
