import {ContactSearchOptions} from "./lib_contact";
import {Document, DocumentEntityType, DocumentSearchOptions} from "./lib_documents";
import {Contact, FinancialMutation} from "../struct";
import {APILedgerAccountAllowedDocumentTypes, APILedgerAccountType} from "./api";

export * from "./lib_contact";
export * from "./lib_documents";
export * from "./lib_financialMutation";

export type EntityType = 'contact' | DocumentEntityType | 'financialMutation';

export type Entity = Contact | Document | FinancialMutation

export interface RequestOptions {
    /* The request method */
    method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    /* The request body */
    body: string | ArrayBuffer,
    additionalHeaders?: { 'content-type'?: string, [key: string]: any }
}

export interface Response<T> {
    data: T,
    status: number,
    maxAge: 0,
    path: string,
    ok: boolean
}

export type UrlOptions = ContactSearchOptions | DocumentSearchOptions | UserSearchOptions;

/** The filter argument allows you to filter on the list. Filters are a combination of keys and values. The most common filter method will be period: period:'this_month'. Filtering works the same as in the web application, for more advanced examples, change the filtering in the web application and learn from the resulting URI. */
export interface Filter {
    [key: string]: string | number | boolean | Date | undefined | null
}

export interface AddNoteOptions {
    /** Text for the note or to-do. */
    note: string,
    /** If true, the note is a to-do. */
    todo?: boolean,
    /** Assign to-do to user. Should be a valid user id. If assignee_id is provided, the note will be a to-do. */
    assignee_id?: string,
}

export interface AddAttachmentOptions {
    attachmentBuffer: Buffer,
    attachmentName?: string,
}

export enum CustomFieldSource {
    SalesInvoice = "sales_invoices", Contact = "contact", Identity = "identity"
}

export type BookingType =
    'SalesInvoice'
    | 'Document'
    | 'LedgerAccount'
    | 'PaymentTransactionBatch'
    | 'PurchaseTransaction'
    | 'NewPurchaseInvoice'
    | 'NewReceipt'
    | 'PaymentTransaction'
    | 'PurchaseTransactionBatch'
    | 'ExternalSalesInvoice'
    | 'Payment'
    | 'VatDocument'

export interface TaxRateSearchOptions {
    /** Select tax rates by their full name */
    name?: string,
    /** Select tax rates with this substring in their name */
    partial_name?: string,
    /** Select tax rates with the specified percentage, e.g., specify 21 for 21% */
    percentage?: number,
    tax_rate_type?: "all" | "general_journal_document" | "purchase_invoice" | "sales_invoice";
    /** Select tax rates with the specified country. Must be a 2-letter abbreviation following ISO 3166. Please note that only foreign tax rates will have this field set. Domestic tax rates will not have this set at the moment. */
    country?: string,
    /** Use true to tax rates for which tax is shown on the invoice, false for when it’s not shown. No value will select both */
    show_tax?: boolean,
    /** Use true to select active tax rates. Use false for inactive tax rates. No value will select both */
    active?: boolean,
    /** Tax rates created after the given time (exclusive). The time to compare with is in UTC timezone */
    created_after?: Date,
    /** Tax rates updated after the given time (exclusive). The time to compare with is in UTC timezone */
    updated_after?: Date,
}

export interface AddPaymentOptions {
    "payment_date": Date,
    /** Both a decimal and a string ‘10,95’ are accepted. Should be a number -1,000,000,000 <= n <= 1,000,000,000. */
    "price": number,
    /** Amount paid expressed in the base currency. Required for foreign currencies. Should be a number -1,000,000,000 <= n <= 1,000,000,000. */
    "price_base"?: number
    "transaction_identifier"?: string,
    "manual_payment_action"?: "private_payment" | "payment_without_proof" | "cash_payment" | "rounding_error" | "bank_transfer" | "balance_settlement" | "invoices_settlement",
    /** Should be a valid ledger account id. */
    "ledger_account_id"?: string,
    /** Should be a valid invoice id. */
    "invoice_id"?: string,
    /** Should be a valid financial account id. */
    "financial_account_id"?: string,
    /** Should be a valid financial mutation id. */
    "financial_mutation_id"?: string,
}

export interface AddLedgerAccountOptions {
    /** Should be unique for this combination of administration and account type. */
    "name": string,
    "account_type": APILedgerAccountType,
    /** Also known as general ledger code. Should be unique. */
    "account_id"?: string,
    /** ID of the parent ledger account. Should be a valid ledger account id. */
    "parent_id"?: string,
    "allowed_document_types"?: APILedgerAccountAllowedDocumentTypes[],
    "description"?: string
}

export interface UpdateLedgerAccountOptions {
    /** Should be unique for this combination of administration and account type. */
    "name"?: string,
    "account_type"?: APILedgerAccountType,
    /** Also known as general ledger code. Should be unique. */
    "account_id"?: string,
    /** ID of the parent ledger account. Should be a valid ledger account id. */
    "parent_id"?: string,
    "allowed_document_types"?: APILedgerAccountAllowedDocumentTypes[],
    "description"?: string
}

export interface UserSearchOptions {
    include_accountants?: boolean,
    include_inactive?: boolean,
}