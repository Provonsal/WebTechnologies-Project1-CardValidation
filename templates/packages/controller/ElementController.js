export default class ElementController {
    #Element;

    get Element() {
        return this.#Element;
    }

    set Element(newElement) {
        this.#Element = newElement;
    }

    ChangeClass(ClassName) {
        this.#Element.className = ClassName;
    }

    GetClassList() {
        return this.#Element.classList;
    }

    GetChildrenList() {
        return this.#Element.children;
    }

    constructor(Element) {
        this.#Element = Element;
    }
}
