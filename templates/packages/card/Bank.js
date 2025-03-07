import VisibilityElementController from "../controller/VisibilityElementController.js";
import ColorElementController from "../controller/ColorElementController.js";
import EnumBankAndId from "../enumerations/EnumBankAndId.js";
import NameValidator from "../validators/NameValidator.js";


export default class Bank {

    #BankName;
    #Color;

    get BankName() { return this.#BankName; };
    get Color() { return this.#Color; };

    #ChangeCardColor() {
        new ColorElementController(document.getElementById("card-back"))
            .ChangeBackgroundColor(this.#Color);
        new ColorElementController(document.getElementById("card-front"))
            .ChangeBackgroundColor(this.#Color);
    }


    ChangeBankImageAndBackground() {

        let bank_element_id = NameValidator.DefineElementIdByName(this.#BankName, EnumBankAndId);

        const all_images_logos = new VisibilityElementController(document.getElementById("placeholder-bank"));

        all_images_logos.HideAllChildren();

        if (EnumBankAndId.IsDefault(bank_element_id)) {
            this.#ChangeCardColor();
            return;
        }

        const src = new VisibilityElementController(document.getElementById(bank_element_id));

        if ((src.CheckVisibility())) {
            src.HideElement();
        } else {
            src.DisplayElement();
        }

        this.#ChangeCardColor();

    }

    constructor(bank_name, color) {

        this.#BankName = bank_name;
        this.#Color = color;

    };

}
;
