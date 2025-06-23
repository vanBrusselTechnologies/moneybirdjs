import {APIInvoiceCustomField, CustomFieldSource, SalesInvoice} from "../types";
import {CustomField} from '.'

// noinspection JSUnusedGlobalSymbols
/** */
export class InvoiceCustomField extends CustomField {
    public value: string;

    constructor(public salesInvoice: SalesInvoice, data: APIInvoiceCustomField) {
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