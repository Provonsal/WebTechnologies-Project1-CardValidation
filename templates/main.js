import { InitCard } from "./packages/card/Card.js";
import InputField from "./packages/elements/InputField.js";
import Button from "./packages/elements/Button.js";
import NumberType from "./packages/statments/NumberType.js";
import FieldLength from "./packages/statments/FieldLength.js";
import KeyCheck from "./packages/statments/KeyCheck.js";
import Formating from "./packages/validators/Formating.js";

let KeysCheckers = [new KeyCheck('v', true), new KeyCheck('c', true), new KeyCheck('Backspace')];

let cardField = new InputField(
    "card-number",
    new FieldLength(16),
    new NumberType(),
    KeysCheckers
);

cardField.SetNewEventListener("blur", Formating.FormatCard);
cardField.SetNewEventListener("focus", Formating.UnFormatCard);
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

let cardCVC = new InputField(
    "card-cvc",
    new FieldLength(3),
    new NumberType(),
    KeysCheckers
);