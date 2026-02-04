import {CustomField, Contact} from ".";
import {APIContactCustomField, APICustomField, CustomFieldSource} from "../types";

export class ContactCustomField extends CustomField {
    public value: string;

    constructor(contact: Contact, data: APIContactCustomField) {
        const customFieldData: APICustomField = {
            id: data.id,
            administration_id: contact.administration_id,
            name: data.name,
            source: CustomFieldSource.Contact
        }
        super(customFieldData);
        this.value = data.value
    }
}