import DefaultValidators from "../validators/DefaultValidators.js";
import Element from "./Element.js";

export default class InputField extends Element {

    #StatementsArray = {
        LengthLimit: null,
        KeyType: null,
        KeyboardKeysALlowed: []
    };

    GetTextLength() {
        return this.GetElementById().value.length;
    }

    SetOnKeydown(func) {
        this.GetElementById().onkeydown = function (e) { return func(e) };
    }

    SetNewEventListener(eventName, func) {
        document.querySelector("#" + this.Id).addEventListener(eventName, func);
    }

    ControlLength(event) {

        let all_checks = [];

        for (const Statment of this.#StatementsArray.KeyboardKeysALlowed) {
            all_checks.push(Statment.Check(event));
        };

        return this.#StatementsArray.KeyType.Check(event.key)
            && this.#StatementsArray.LengthLimit.Check(this.GetTextLength())
            || DefaultValidators.any(all_checks);
    }

    AppendText(pasted_string) {
        this.GetElementById().value += pasted_string;
    }

    ControlPaste(event) {

        event.preventDefault();

        let pasted_string = event.clipboardData.getData("text/plain");

        let all_checks = [
            DefaultValidators.IsNonDigitInside(pasted_string),
            (pasted_string.length > 16),
            ((this.GetTextLength() + pasted_string.length) > 16)
        ];

        if (!(DefaultValidators.any(all_checks))) {
            this.AppendText(pasted_string);
        }
    }

    constructor(ElementId, LengthExpr, KeyTypeExpr, KeyboardKeysExprArr) {
        super(ElementId);
        this.#StatementsArray.LengthLimit = LengthExpr;
        this.#StatementsArray.KeyType = KeyTypeExpr;
        this.#StatementsArray.KeyboardKeysALlowed = KeyboardKeysExprArr;
        this.SetOnKeydown(this.ControlLength.bind(this));
    }
}