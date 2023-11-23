import {Filter} from "./lib";

export interface ReceiptSearchOptions {
    page?: number,
    per_page?: number,
    exclude_new_general_journal_documents?: boolean,
    filter?: Filter,
    new_filter?: Filter,
}

export interface AddReceiptOptions {
    /** Should be a valid contact id. */
    contact_id: string,
    reference: string,
    date?: Date,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    /** Can be api, upload, endpoint, si, si_local, si_peppol, email or moneybird_bv. */
    origin?: string,
    details_attributes: AddReceiptDetailsAttribute[]
    //payment:{/** Should be a valid financial account id. */financial_account_id:number}
}

export interface AddReceiptDetailsAttribute{
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

export interface UpdateReceiptOptions {
    /** Should be a valid contact id. */
    contact_id?: string,
    reference?: string,
    date?: Date,
    /** ISO three-character currency code, e.g., EUR or USD. */
    currency?: string,
    prices_are_incl_tax?: boolean,
    /** Can be api, upload, endpoint, si, si_local, si_peppol, email or moneybird_bv. */
    origin?: string,
    details_attributes?: UpdateReceiptDetailsAttribute[]
}

export interface UpdateReceiptDetailsAttribute {
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
    _destroy?: boolean,
    //payment:{/** Should be a valid financial account id. */financial_account_id:number}
}