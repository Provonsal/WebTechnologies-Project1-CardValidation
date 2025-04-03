import ExpressionStatment from "./ExpressionStatment.js";

export default class KeyCheck extends ExpressionStatment {
    #code;
    #Ctrl;
    #Shift;

    Check(KeydownEvent) {
        return (KeydownEvent.code == this.#code)
            && (KeydownEvent.ctrlKey == this.#Ctrl)
            && (KeydownEvent.shiftKey == this.#Shift);
    }

    constructor(code, ctrl = false, shift = false) {
        super();
        this.#code = code;
        this.#Ctrl = ctrl;
        this.#Shift = shift;
    }

}
