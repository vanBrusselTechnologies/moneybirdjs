"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactCustomField = void 0;
const types_1 = require("../types");
const struct_1 = require("../struct");
class ContactCustomField extends struct_1.CustomField {
    constructor(contact, data) {
        const customFieldData = {
            id: data.id,
            administration_id: contact.administration_id,
            name: data.name,
            source: types_1.CustomFieldSource.Contact
        };
        super(contact.administration, customFieldData);
        this.contact = contact;
        this.value = data.value;
    }
}
exports.ContactCustomField = ContactCustomField;
