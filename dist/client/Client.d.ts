import { Administration } from "../struct";
import { RESTManager } from "../rest/RESTManager";
/** */
export declare class Client {
    rest: RESTManager;
    constructor(apiToken: string);
    getAdministrations(): Promise<Administration[]>;
}
