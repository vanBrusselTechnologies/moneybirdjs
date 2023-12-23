import {Filter} from "./lib";

export interface SalesInvoiceSearchOptions {
    page?: number,
    per_page?: number,
    filter?: Filter
}

export interface AddSalesInvoiceOptions {
    /** Should be a valid contact id. */
    contact_id: string,
    /** Should be a valid contact person id. */
    contact_person_id?: string,
    original_estimate_id?: string,
    /** Default document style is used if value is not provided. Should be a valid document style id. */
    document_style_id?: string,
    /** If value is not provided, the workflow saved in the contact is used. If the contact doesn't have a default workflow, the administration’s default workflow is used. Should be a valid workflow id. */
    workflow_id?: string,
    reference?: string,
    invoice_sequence_id?: string,
    invoice_date?: Date,
    first_due_interval?: number,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    payment_conditions?: string,
    discount?: number,
    details_attributes?: AddSalesInvoiceDetailsAttribute[],
    custom_fields_attributes?: { [index: number]: { "id": number, "value": string } },
    from_checkout?: boolean
}

export interface AddSalesInvoiceDetailsAttribute {
    description: string,
    /** String with a date range: 20140101..20141231, presets are also allowed: this_month, prev_month, next_month, etc. */
    period?: string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    price?: number | string,
    amount?: string,
    /** Should be a valid tax rate id. */
    tax_rate_id: string,
    /** Should be a valid ledger account id. */
    ledger_account_id?: string,
    /** Should be a valid project id. */
    project_id?: string,
    /** Should be a valid product id. */
    product_id?: string,
    time_entry_ids: number[],
    row_order?: number,
    automated_tax_enabled?: boolean
}

export interface UpdateSalesInvoiceOptions {
    /** Should be a valid contact id. */
    contact_id: string,
    /** Should be a valid contact person id. */
    contact_person_id?: string,
    update_contact?: boolean,
    original_estimate_id?: string,
    /** Default document style is used if value is not provided. Should be a valid document style id. */
    document_style_id?: string,
    /** If value is not provided, the workflow saved in the contact is used. If the contact doesn't have a default workflow, the administration’s default workflow is used. Should be a valid workflow id. */
    workflow_id?: string,
    reference?: string,
    invoice_sequence_id?: string,
    remove_invoice_sequence_id?: boolean,
    invoice_date?: Date,
    first_due_interval: number,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    payment_conditions?: string,
    discount?: number,
    details_attributes: UpdateSalesInvoiceDetailsAttribute[],
    custom_fields_attributes?: { [index: number]: { "id": number, "value": string } }
}

export interface UpdateSalesInvoiceDetailsAttribute {
    id?: string,
    description?: string,
    /** String with a date range: 20140101..20141231, presets are also allowed: this_month, prev_month, next_month, etc. */
    period?: string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    price?: number | string,
    amount?: string,
    /** Should be a valid tax rate id. */
    tax_rate_id?: string,
    /** Should be a valid ledger account id. */
    ledger_account_id?: string,
    /** Should be a valid project id. */
    project_id?: string,
    /** Should be a valid product id. */
    product_id?: string,
    time_entry_ids: number[],
    row_order?: number,
    _destroy?: boolean,
    automated_tax_enabled?: boolean
}