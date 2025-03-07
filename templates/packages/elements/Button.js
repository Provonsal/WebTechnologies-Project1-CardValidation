import Element from "./Element.js";


export default class Button extends Element {
    SetNewEventListener(eventName, func) {
        document.querySelector("#" + this.Id).addEventListener(eventName, func);
    }
    constructor(ElementId) {
        super(ElementId);
    }
}
