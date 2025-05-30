import Bank from "../card/Bank.js";
import ApiRoute from "./ApiRoute.js";

export default class ApiCheckBin extends ApiRoute {

    constructor(){
        super();
        this.Host = this.Host + "/checkBin";
    }

    GetResponse(bin) {

        let data = this.Get(this.Host + '/' + bin);

        return new Bank(data.bank, data.color);
    }
}

export class ApiOptions extends ApiRoute {

    constructor(){
        super();
        this.Host = this.Host + "/options";
    }

    GetResponse() {

        let data = this.Get(this.Host + '/');

        return data;
    }
}