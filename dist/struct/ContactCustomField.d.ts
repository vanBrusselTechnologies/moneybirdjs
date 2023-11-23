import { APIContactCustomField } from "../types";
import { CustomField } from "./CustomField";
import { Contact } from "./Contact";
export declare class ContactCustomField extends CustomField {
    contact: Contact;
    value: string;
    constructor(contact: Contact, data: APIContactCustomField);
}
