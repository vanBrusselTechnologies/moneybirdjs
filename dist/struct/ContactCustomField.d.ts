import { APIContactCustomField } from "../types";
import { CustomField, Contact } from "../struct";
export declare class ContactCustomField extends CustomField {
    contact: Contact;
    value: string;
    constructor(contact: Contact, data: APIContactCustomField);
}
