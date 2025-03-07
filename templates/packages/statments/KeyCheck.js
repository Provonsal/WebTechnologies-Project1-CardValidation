import ExpressionStatment from "./ExpressionStatment.js";

export default class KeyCheck extends ExpressionStatment {
    #Key;
    #Ctrl;
    #Shift;

    Check(KeydownEvent) {
        return (KeydownEvent.key == this.#Key)
            && (KeydownEvent.ctrlKey == this.#Ctrl)
            && (KeydownEvent.shiftKey == this.#Shift);
    }

    constructor(key, ctrl = false, shift = false) {
        super();
        this.#Key = key;
        this.#Ctrl = ctrl;
        this.#Shift = shift;
    }

}
