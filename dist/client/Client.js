"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const struct_1 = require("../struct");
const RESTManager_1 = require("../rest/RESTManager");
// noinspection JSUnusedGlobalSymbols
/** */
class Client {
    constructor(apiToken) {
        this.rest = new RESTManager_1.RESTManager(apiToken);
    }
    async getAdministrations() {
        const { data } = await this.rest.getAdministrations();
        return data.map((entry) => new struct_1.Administration(this, entry));
    }
}
exports.Client = Client;
