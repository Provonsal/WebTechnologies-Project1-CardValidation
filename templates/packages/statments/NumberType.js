import ExpressionStatment from "./ExpressionStatment.js";

export default class NumberType extends ExpressionStatment {

    Check(key) {
        return key >= 0 && key < 9;
    }

}
