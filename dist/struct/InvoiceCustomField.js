"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceCustomField = void 0;
const types_1 = require("../types");
const CustomField_1 = require("./CustomField");
class InvoiceCustomField extends CustomField_1.CustomField {
    constructor(salesInvoice, data) {
        const customFieldData = {
            id: data.id,
            administration_id: salesInvoice.administration_id,
            name: data.name,
            source: types_1.CustomFieldSource.SalesInvoice
        };
        super(salesInvoice.administration, customFieldData);
        this.salesInvoice = salesInvoice;
        this.value = data.value;
    }
}
exports.InvoiceCustomField = InvoiceCustomField;
