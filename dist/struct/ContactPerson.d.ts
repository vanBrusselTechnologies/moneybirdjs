import { APIContactPerson, ContactPersonOptions } from "../types";
import { Contact } from "../struct";
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
    update(options: ContactPersonOptions): Promise<this>;
    delete(): Promise<void>;
}
