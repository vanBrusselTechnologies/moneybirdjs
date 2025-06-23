import {APIEvent, Document} from "../types";
import {Contact} from '.';

// noinspection JSUnusedGlobalSymbols
/** */
export class Event {
    administration_id: string;
    user_id: string;
    action: string;
    link_entity_id: null;
    link_entity_type: null;
    data: {[key:string]: string};
    created_at: Date;
    updated_at: Date;

    constructor(public entity: Contact | Document, data: APIEvent) {
        this.administration_id = data.administration_id;
        this.user_id = data.user_id;
        this.action = data.action;
        this.link_entity_id = data.link_entity_id;
        this.link_entity_type = data.link_entity_type;
        this.data = data.data;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}