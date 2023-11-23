import { APIEvent, Document } from "../types";
import { Contact } from "./Contact";
export declare class Event {
    entity: Contact | Document;
    administration_id: string;
    user_id: string;
    action: string;
    link_entity_id: null;
    link_entity_type: null;
    data: {
        [key: string]: string;
    };
    created_at: Date;
    updated_at: Date;
    constructor(entity: Contact | Document, data: APIEvent);
}
