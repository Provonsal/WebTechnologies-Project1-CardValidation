import Route from "./Route.js";

export default class ApiRoute extends Route {
    constructor() {
        super();
        this.Host = this.Host + "/api";
    }
}
