import {Filter} from "./lib";

export interface PurchaseInvoiceSearchOptions {
    page?: number,
    per_page?: number,
    exclude_new_general_journal_documents?: boolean,
    filter?: Filter,
    new_filter?: Filter,
}

export interface AddPurchaseInvoiceOptions {
    /** Should be a valid contact id. */
    contact_id: string,
    reference: string,
    date?: Date,
    due_date?: Date,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    revenue_invoice?: boolean,
    details_attributes: AddPurchaseInvoiceDetailsAttribute[]
}

export interface AddPurchaseInvoiceDetailsAttribute{
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
    row_order?: number
}

export interface UpdatePurchaseInvoiceOptions {
    /** Should be a valid contact id. */
    contact_id?: string,
    reference?: string,
    date?: Date,
    due_date?: Date,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    revenue_invoice?: boolean,
    details_attributes?: UpdatePurchaseInvoiceDetailsAttribute[]
}

export interface UpdatePurchaseInvoiceDetailsAttribute {
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
    row_order?: number,
    _destroy?: boolean
}