export default class CardNumber {
    #Number = "";
    #IsValid = false;

    get Number() {
        return this.#Number;
    };

    get IsValid() {
        return this.#IsValid;
    }

    ValidateNumber(number) {
        return true;
    }

    constructor(Number) {
        this.#Number = Number;
        this.#IsValid = this.ValidateNumber(this.#Number);
    }
};
