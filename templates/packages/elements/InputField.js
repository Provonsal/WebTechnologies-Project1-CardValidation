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

        let tmp = this.GetElementById().selectionStart;

        let text = this.GetElementById().value.split('');
        
        if (event.key == 'Backspace' && text[tmp - 2] == ' ') {
            
            let tmp2 = text;
            
            tmp2.splice(tmp - 2, 1);
            
            let tmp4 = tmp2
            .join()
            .replaceAll(',', '');
            
            this.GetElementById().value = tmp4;
        }
        
        let IsValid = this.#StatementsArray.KeyType.Check(event.key)
        && this.#StatementsArray.LengthLimit.Check(this.GetTextLength())
        || DefaultValidators.any(all_checks)
        
        if (IsValid && event.key != 'Backspace') {
            for (let i = 0, counter = 1; i < text.length; i++, counter++) {

                if (counter == 4 && text[i + 1] != ' ' && i + 1 != 16) {
                    text.splice(++i, 0, ' ');
                    counter = 1;
                    i++;
                }
                else if (counter == 4) {
                    counter = 0;
                    i++;
                }
            }
            
            this.GetElementById().value = String(text.join()).replaceAll(',', '');
        }


        return IsValid;
    }

    AppendText(pasted_string) {
        let tmp_str = this.GetElementById().value.replaceAll(' ', '') + pasted_string;
        this.GetElementById().value = String(tmp_str).substring(0, 16);
    }

    ControlPaste(event) {

        event.preventDefault();

        let pasted_string = event.clipboardData.getData("text/plain");

        let all_checks = [
            DefaultValidators.IsNonDigitInside(pasted_string),
            //(pasted_string.length > 16),
            // ((this.GetTextLength() + pasted_string.length) > 16)
        ];

        if (!(DefaultValidators.any(all_checks))) {
            this.AppendText(pasted_string);

            //original_string = String(this.GetElementById().value).split('');
            pasted_string = String(this.GetElementById().value).split('');

            for (let i = 0, counter = 1; i < pasted_string.length; i++, counter++) {

                if (counter == 4 && pasted_string[i + 1] != ' ' && i + 1 != pasted_string.length) {
                    pasted_string.splice(++i, 0, ' ');
                    counter = 1;
                    i++;
                } else if (counter == 4) {
                    counter = 0;
                    i++;
                }
            }
            this.GetElementById().value = String(pasted_string.join()).replaceAll(',', '');
        }

    }

    constructor(ElementId, LengthExpr, KeyTypeExpr, KeyboardKeysExprArr) {
        super(ElementId);
        this.#StatementsArray.LengthLimit = LengthExpr;
        this.#StatementsArray.KeyType = KeyTypeExpr;
        this.#StatementsArray.KeyboardKeysALlowed = KeyboardKeysExprArr;
        this.SetOnKeydown(this.ControlLength.bind(this));
        navigator.clipboard.writeText
    }
}