import {Administration} from "../struct";
import {RESTManager} from "../rest/RESTManager";

export class Client {
    rest: RESTManager;

    constructor(apiToken: string) {
        this.rest = new RESTManager(apiToken)
    }

    /**
     * Lists all administrations the current user has access to.
     * @see https://developer.moneybird.com/api/administrations#list-all-administrations
     */
    async getAdministrations() {
        const {data} = await this.rest.getAdministrations()
        return data.map((entry) => new Administration(this, entry))
    }
}