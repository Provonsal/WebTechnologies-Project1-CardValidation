import ElementController from "./ElementController.js";

export default class VisibilityElementController extends ElementController {

    #VisibilityStates = Object.freeze({
        HIDDEN: "hidden",
        EXPOSED: ""
    });
    
    #IsVisible;

    get IsVisible() {
        return this.#IsVisible;
    }

    HideElement() {
        this.ChangeClass(this.#VisibilityStates.HIDDEN);
        this.#IsVisible = false;
    }

    DisplayElement() {
        this.ChangeClass(this.#VisibilityStates.EXPOSED);
        this.#IsVisible = true;
    }

    CheckVisibility() {
        this.#IsVisible = this.GetClassList().contains(this.#VisibilityStates.EXPOSED);
        return this.#IsVisible;
    }

    GetChildrenList(){
        let children = Array();

        for (const child of super.GetChildrenList()) {
            children.push(new VisibilityElementController(child));
        }

        return children;
    }

    HideAllChildren() {
        for (const child of this.GetChildrenList()) {
            child.HideElement();
        }
    }

    constructor(Element){
        super(Element);
        this.CheckVisibility();
    }
}