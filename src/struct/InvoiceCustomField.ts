import {CustomField} from "."
import {APIInvoiceCustomField, CustomFieldSource, SalesInvoice} from "../types";

export class InvoiceCustomField extends CustomField {
    public value: string;

    constructor(salesInvoice: SalesInvoice, data: APIInvoiceCustomField) {
        const customFieldData = {
            id: data.id,
            administration_id: salesInvoice.administration_id,
            name: data.name,
            source: CustomFieldSource.SalesInvoice
        }
        super(salesInvoice.administration, customFieldData);
        this.value = data.value
    }
}