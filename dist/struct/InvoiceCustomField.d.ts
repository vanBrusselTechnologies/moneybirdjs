import { APIInvoiceCustomField, SalesInvoice } from "../types";
import { CustomField } from "./CustomField";
export declare class InvoiceCustomField extends CustomField {
    salesInvoice: SalesInvoice;
    value: string;
    constructor(salesInvoice: SalesInvoice, data: APIInvoiceCustomField);
}
