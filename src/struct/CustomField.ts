import {APICustomField, CustomFieldSource, Identifier} from "../types";

/** Custom fields can be used to add extra information to sales invoices, contacts, and identities. */
export class CustomField {
    public id: Identifier;
    public administration_id: Identifier;
    public name: string;
    public source: CustomFieldSource;

    constructor(data: APICustomField) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.source = data.source
    }
}