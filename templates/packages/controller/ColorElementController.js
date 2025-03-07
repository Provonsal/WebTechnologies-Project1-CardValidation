import ElementController from "./ElementController.js";

export default class ColorElementController extends ElementController {
    ChangeBackgroundColor(color) {
        this.Element.style.backgroundColor = color;
    }

    GetCurrentBackgroundColor() {
        return this.Element.style.backgroundColor;
    }
}
