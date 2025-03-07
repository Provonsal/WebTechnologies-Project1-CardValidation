import NameValidator from "../validators/NameValidator.js";
import SystemIds from "../enumerations/SystemIds.js";
import VisibilityElementController from "../controller/VisibilityElementController.js";

export default class CardSystem {

    #Name = SystemIds.GetDefault();

    get Name() {
        return this.#Name;
    };

    ChangeCardImage() {

        let card_id = NameValidator.DefineElementIdByName(this.#Name, SystemIds);

        if (SystemIds.IsDefault(card_id)) {

            const src = new VisibilityElementController(document.getElementById("card-image"));

            src.HideAllChildren();

            this.#Name = SystemIds.GetDefault();

        } else {

            const wrapper = new VisibilityElementController(document.getElementById("card-image"));

            wrapper.HideAllChildren();

            const src = new VisibilityElementController(document.getElementById(card_id));

            if ((src.CheckVisibility())) {
                src.HideElement();
            } else {
                src.DisplayElement();
            }

            this.#Name = card_id;
        }
    }

    constructor(Name) {
        this.#Name = Name;
    }
}
;
