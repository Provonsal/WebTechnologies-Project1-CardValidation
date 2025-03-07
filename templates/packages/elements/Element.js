export default class Element {

    #Id;

    get Id() {
        return this.#Id;
    }

    GetElementById() {
        return document.getElementById(this.#Id);
    }

    constructor(ElementId) {
        this.#Id = ElementId;
    }
}
