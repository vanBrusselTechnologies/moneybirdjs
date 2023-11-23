import {Filter} from "./lib";

export interface ContactSearchOptions {
    page?: number,
    per_page?: number,
    query?: string,
    include_archived?: boolean,
    todo?: string,
    filter?: Filter,
}

export interface AddContactOptions {
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "company_name"?: string,
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "firstname"?: string,
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "lastname"?: string,
    "address1"?: string,
    "address2"?: string,
    "zipcode"?: string,
    "city"?: string,
    /** ISO two-character country code, e.g., NL or DE. */
    "country"?: string,
    "phone"?: string,
    "delivery_method"?: 'Email' | 'Simplerinvoicing' | 'Manual',
    /** Will be assigned automatically if empty. Should be unique for the administration. */
    "customer_id"?: string,
    "tax_number"?: string,
    "chamber_of_commerce"?: string,
    "bank_account"?: string,
    "send_invoices_to_attention"?: string,
    /** Should be one or more valid email addresses, separated by a comma. */
    "send_invoices_to_email"?: string,
    "send_estimates_to_attention"?: string,
    /** Should be one or more valid email addresses, separated by a comma. */
    "send_estimates_to_email"?: string,
    /** When true, all other SEPA fields are required. */
    "sepa_active"?: boolean,
    /** Should be a valid IBAN. */
    "sepa_iban"?: string,
    "sepa_iban_account_name"?: string,
    /** Should be a valid BIC. */
    "sepa_bic"?: string,
    "sepa_mandate_id"?: string,
    /** Should be a date in the past. */
    "sepa_mandate_date"?: Date,
    "sepa_sequence_type"?: 'RCUR' | 'FRST' | 'OOFF' | 'FNAL',
    "email_ubl"?: boolean,
    /** Should be a valid invoice workflow id. */
    "invoice_workflow_id"?: number,
    /** Should be a valid estimate workflow id. */
    "estimate_workflow_id"?: number,
    "si_identifier"?: string,
    "si_identifier_type"?: string,
    "direct_debit"?: boolean,
    "custom_fields_attributes"?: {[index:number]:{"id": number, "value": string}},
    "contact_person"?: {"firstname": number, "lastname": string},
    "type"?: string,
    "from_checkout"?: boolean,
}

export interface UpdateContactOptions {
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "company_name"?: string,
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "firstname"?: string,
    /** A contact requires a non-blank company_name, firstname or lastname. */
    "lastname"?: string,
    "address1"?: string,
    "address2"?: string,
    "zipcode"?: string,
    "city"?: string,
    /** ISO two-character country code, e.g., NL or DE. */
    "country"?: string,
    "phone"?: string,
    "delivery_method"?: 'Email' | 'Simplerinvoicing' | 'Manual',
    /** Will be assigned automatically if empty. Should be unique for the administration. */
    "customer_id"?: string,
    "tax_number"?: string,
    "chamber_of_commerce"?: string,
    "bank_account"?: string,
    "send_invoices_to_attention"?: string,
    /** Should be one or more valid email addresses, separated by a comma. */
    "send_invoices_to_email"?: string,
    "send_estimates_to_attention"?: string,
    /** Should be one or more valid email addresses, separated by a comma. */
    "send_estimates_to_email"?: string,
    /** When true, all other SEPA fields are required. */
    "sepa_active"?: boolean,
    /** Should be a valid IBAN. */
    "sepa_iban"?: string,
    "sepa_iban_account_name"?: string,
    /** Should be a valid BIC. */
    "sepa_bic"?: string,
    "sepa_mandate_id"?: string,
    /** Should be a date in the past. */
    "sepa_mandate_date"?: Date,
    "sepa_sequence_type"?: 'RCUR' | 'FRST' | 'OOFF' | 'FNAL',
    "email_ubl"?: boolean,
    /** Should be a valid invoice workflow id. */
    "invoice_workflow_id"?: number,
    /** Should be a valid estimate workflow id. */
    "estimate_workflow_id"?: number,
    "si_identifier"?: string,
    "si_identifier_type"?: string,
    "direct_debit"?: boolean,
    "custom_fields_attributes"?: {[index:number]:{"id": number, "value": string}},
}

export interface ContactPersonOptions {
    firstname:string,
    lastname:string,
    phone?:string,
    /** Should be a valid email addresses */
    email?:string,
    department?: string
}