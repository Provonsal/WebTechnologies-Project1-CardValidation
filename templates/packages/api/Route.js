import WebInterface from "./WebInterface.js";

export default class Route extends WebInterface {
    #host = "http://127.0.0.1:8000";

    get Host() {
        return this.#host;
    }

    set Host(newHost) {
        this.#host = newHost;
    }
}
