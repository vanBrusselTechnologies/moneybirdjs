import {CustomField} from "."
import {APICustomField, APIInvoiceCustomField, CustomFieldSource, SalesInvoice} from "../types";

export class InvoiceCustomField extends CustomField {
    public value: string;

    constructor(salesInvoice: SalesInvoice, data: APIInvoiceCustomField) {
        const customFieldData: APICustomField = {
            id: data.id,
            administration_id: salesInvoice.administration_id,
            name: data.name,
            source: CustomFieldSource.SalesInvoice
        }
        super(customFieldData);
        this.value = data.value
    }
}