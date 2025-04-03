import { InitCard } from "./packages/card/Card.js";
import InputField from "./packages/elements/InputField.js";
import Button from "./packages/elements/Button.js";
import NumberType from "./packages/statments/NumberType.js";
import FieldLength from "./packages/statments/FieldLength.js";
import KeyCheck from "./packages/statments/KeyCheck.js";
import Formating from "./packages/validators/Formating.js";

let KeysCheckers = [
    new KeyCheck('KeyV', true), 
    new KeyCheck('KeyC', true), 
    new KeyCheck('Backspace'),
    new KeyCheck('ArrowLeft'),
    new KeyCheck('ArrowLeft', true),
    new KeyCheck('ArrowUp'),
    new KeyCheck('ArrowUp', true),
    new KeyCheck('ArrowDown'),
    new KeyCheck('ArrowDown', true),
    new KeyCheck('ArrowRight'),
    new KeyCheck('ArrowRight', true),
    new KeyCheck('ArrowLeft', false, true),
    new KeyCheck('ArrowUp', false, true),
    new KeyCheck('ArrowDown', false, true),
    new KeyCheck('ArrowRight', false, true),
    new KeyCheck('ArrowLeft', true, true),
    new KeyCheck('ArrowUp', true, true),
    new KeyCheck('ArrowDown', true, true),
    new KeyCheck('ArrowRight', true, true)
];

let cardField = new InputField(
    "card-number",
    new FieldLength(16),
    new NumberType(),
    KeysCheckers
);

cardField.SetNewEventListener("blur", InitCard);
cardField.SetNewEventListener("focus", InitCard);
cardField.SetNewEventListener("input", InitCard);
cardField.SetNewEventListener("paste", cardField.ControlPaste.bind(cardField));

let cardButton = new Button(
    "card-btn"
);

cardButton.SetNewEventListener("click", InitCard);

let cardMonth = new InputField(
    "card-month",
    new FieldLength(2),
    new NumberType(),
    KeysCheckers
);

let cardYear = new InputField(
    "card-year",
    new FieldLength(2),
    new NumberType(),
    KeysCheckers
);

function CheckDate() {
    let month = cardMonth.GetElementById();
    let year = cardYear.GetElementById();
    let CardDate = new Date();
    CardDate.setFullYear(String(Number(year.value)+2000), Number(month.value)>0? Number(month.value)-1 : Number(month.value), 1);
    let today = new Date();
    if (CardDate < today) {
        document.getElementById("form-errors").classList.remove("hidden");
    }
}

function RemoveErrors() {
    document.getElementById("form-errors").classList.add("hidden");
}

cardMonth.SetNewEventListener('focus', RemoveErrors);
cardYear.SetNewEventListener('focus', RemoveErrors);
cardMonth.SetNewEventListener('blur', CheckDate);
cardYear.SetNewEventListener('blur', CheckDate);
// cardMonth.SetNewEventListener('input', CheckDate);
// cardYear.SetNewEventListener('input', CheckDate);

let cardCVC = new InputField(
    "card-cvc",
    new FieldLength(3),
    new NumberType(),
    KeysCheckers
);