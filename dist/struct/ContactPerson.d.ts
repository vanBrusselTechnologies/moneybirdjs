import { APIContactPerson, ContactPersonOptions } from "../types";
import { Contact } from "./Contact";
export declare class ContactPerson {
    contact: Contact;
    id: string;
    administration_id: string;
    firstname: string;
    lastname: string;
    phone: null | string;
    email: null | string;
    department: null | string;
    created_at: Date;
    updated_at: Date;
    version: number;
    constructor(contact: Contact, data: APIContactPerson);
    private setData;
    /** Deletes this contact, or archives it when deleting was not possible. */
    update(options: ContactPersonOptions): Promise<this>;
    /** Deletes this contact, or archives it when deleting was not possible. */
    delete(): Promise<void>;
}
