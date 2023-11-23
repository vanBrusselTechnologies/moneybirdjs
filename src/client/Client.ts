import {Administration} from "../struct";
import {RESTManager} from "../rest/RESTManager";

// noinspection JSUnusedGlobalSymbols
/** */
export class Client {
    rest: RESTManager;

    constructor(apiToken: string) {
        this.rest = new RESTManager(apiToken)
    }

    async getAdministrations() {
        const {data} = await this.rest.getAdministrations()
        return data.map((entry) => new Administration(this, entry))
    }
}