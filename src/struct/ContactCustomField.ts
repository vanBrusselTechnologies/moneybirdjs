import {CustomField, Contact} from ".";
import {APIContactCustomField, CustomFieldSource} from "../types";

export class ContactCustomField extends CustomField {
    public value: string;

    constructor(contact: Contact, data: APIContactCustomField) {
        const customFieldData = {
            id: data.id,
            administration_id: contact.administration_id,
            name: data.name,
            source: CustomFieldSource.Contact
        }
        super(contact.administration, customFieldData);
        this.value = data.value
    }
}