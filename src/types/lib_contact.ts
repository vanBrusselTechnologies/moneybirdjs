import {Filter, Identifier, PagedOptions, Period} from "./lib";

export type DeliveryMethod = 'Email' | 'Simplerinvoicing' | 'Peppol' | 'Manual' | 'Post';
export type SepaSequenceType = 'RCUR' | 'FRST' | 'OOFF' | 'FNAL';
export type CreditCardType = 'mastercard' | 'visa';
export type SiIdentifierType =
    '0002'
    | '0007'
    | '0009'
    | '0037'
    | '0060'
    | '0088'
    | '0096'
    | '0097'
    | '0106'
    | '0130'
    | '0135'
    | '0142'
    | '0151'
    | '0183'
    | '0184'
    | '0188'
    | '0190'
    | '0191'
    | '0192'
    | '0193'
    | '0195'
    | '0196'
    | '0198'
    | '0199'
    | '0200'
    | '0201'
    | '0204'
    | '0205'
    | '0208'
    | '0209'
    | '0210'
    | '0211'
    | '0212'
    | '0213'
    | '0215'
    | '0216'
    | '0221'
    | '0230'
    | '9910'
    | '9913'
    | '9914'
    | '9915'
    | '9918'
    | '9919'
    | '9920'
    | '9922'
    | '9923'
    | '9924'
    | '9925'
    | '9926'
    | '9927'
    | '9928'
    | '9929'
    | '9930'
    | '9931'
    | '9932'
    | '9933'
    | '9934'
    | '9935'
    | '9936'
    | '9937'
    | '9938'
    | '9939'
    | '9940'
    | '9941'
    | '9942'
    | '9943'
    | '9944'
    | '9945'
    | '9946'
    | '9947'
    | '9948'
    | '9949'
    | '9950'
    | '9951'
    | '9952'
    | '9953'
    | '9957'
    | '9959';

export interface ContactFilterOptions extends PagedOptions {
    /**
     * Filters are a combination of keys and values,
     * separated by a comma: `{first_name:henk,last_name:jansen}`. The available options for filtering are:
     *
     * | **Filter** | **Type** | **Default** | **Description** |
     * | - | - | - | - |
     * | created_after | `String` | | Select contacts created after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in the UTC timezone |
     * | updated_after | `String` | | Select contacts updated after the given time (exclusive). ISO 8601 formatted string. The time to compare with is in the UTC timezone |
     * | first_name | `String` | | Select contacts with the given first name. Case-insensitive |
     * | last_name | `String` | | Select contacts with the given last name. Case-insensitive |
     * | estimate_workflow_id | `Integer` | | Filters contacts by a single Estimate workflow |
     * | invoice_workflow_id | `Integer` | | Filters contacts by a single Invoice workflow |
     * | contact_type | `String` | | The contact type. Possible values `all`, `company`, `private_individual` |
     * | delivery_method | `String` | | The delivery method for invoices. Possible values. Possible values `all`, `email`, `post`, `manual`, `peppol`, `simplerinvoicing` |
     * | trusted_type | `String` | | Whether the contact is trusted. Possible values `all`, `trusted`, `not_trusted` |
     * | - | - | - | - |
     */
    filter?: Filter
    include_archived?: boolean
}

export interface ContactListIdsOptions {
    filter?: Filter
    include_archived?: boolean
}

export interface ContactSearchOptions extends PagedOptions {
    query?: string
    include_archived?: boolean
    todo?: string
    contact_field?: string
    contact_value?: string
}

export interface AddContactOptions {
    /** A contact requires a non-blank [company_name]{@link AddContactOptions.company_name}, [firstname]{@link AddContactOptions.firstname} or [lastname]{@link AddContactOptions.lastname}. */
    company_name?: string
    address1?: string
    address2?: string
    zipcode?: string
    city?: string
    /** ISO two-character country code, e.g., NL or DE. */
    country?: string
    phone?: string
    delivery_method?: DeliveryMethod
    /** Will be assigned automatically if empty. Should be unique for the administration. */
    customer_id?: string
    tax_number?: string
    /** A contact requires a non-blank [company_name]{@link AddContactOptions.company_name}, [firstname]{@link AddContactOptions.firstname} or [lastname]{@link AddContactOptions.lastname}. */
    firstname?: string
    /** A contact requires a non-blank [company_name]{@link AddContactOptions.company_name}, [firstname]{@link AddContactOptions.firstname} or [lastname]{@link AddContactOptions.lastname}. */
    lastname?: string
    chamber_of_commerce?: string
    bank_account?: string
    send_invoices_to_attention?: string
    /** Should be one or more valid email addresses, separated by a comma. */
    send_invoices_to_email?: string
    send_estimates_to_attention?: string
    /** Should be one or more valid email addresses, separated by a comma. */
    send_estimates_to_email?: string
    /** When `true`, all other SEPA fields are required. */
    sepa_active?: boolean
    /** Should be a valid IBAN. */
    sepa_iban?: string
    sepa_iban_account_name?: string
    /** Should be a valid BIC. */
    sepa_bic?: string
    /** Should be unique for the administration. */
    sepa_mandate_id?: string
    /** Should be a date in the past. */
    sepa_mandate_date?: Date
    sepa_sequence_type?: SepaSequenceType
    si_identifier_type?: SiIdentifierType
    si_identifier?: string
    /** Should be a valid invoice {@link Workflow.id}. */
    invoice_workflow_id?: Identifier
    /** Should be a valid estimate {@link Workflow.id}. */
    estimate_workflow_id?: Identifier
    email_ubl?: boolean
    direct_debit?: boolean
    custom_fields_attributes?: { id: Identifier, value: string }[]
    contact_person?: { firstname: string, lastname: string }
}

export interface UpdateContactOptions {
    /** A contact requires a non-blank [company_name]{@link UpdateContactOptions.company_name}, [firstname]{@link UpdateContactOptions.firstname} or [lastname]{@link UpdateContactOptions.lastname}. */
    company_name?: string
    address1?: string
    address2?: string
    zipcode?: string
    city?: string
    /** ISO two-character country code, e.g., NL or DE. */
    country?: string
    phone?: string
    delivery_method?: DeliveryMethod
    email_ubl?: boolean
    /** Will be assigned automatically if empty. Should be unique for the administration. */
    customer_id?: string
    tax_number?: string
    /** A contact requires a non-blank [company_name]{@link UpdateContactOptions.company_name}, [firstname]{@link UpdateContactOptions.firstname} or [lastname]{@link UpdateContactOptions.lastname}. */
    firstname?: string
    /** A contact requires a non-blank [company_name]{@link UpdateContactOptions.company_name}, [firstname]{@link UpdateContactOptions.firstname} or [lastname]{@link UpdateContactOptions.lastname}. */
    lastname?: string
    chamber_of_commerce?: string
    bank_account?: string
    send_invoices_to_attention?: string
    /** Should be one or more valid email addresses, separated by a comma. */
    send_invoices_to_email?: string
    send_estimates_to_attention?: string
    /** Should be one or more valid email addresses, separated by a comma. */
    send_estimates_to_email?: string
    /** When `true`, all other SEPA fields are required. */
    sepa_active?: boolean
    /** Should be a valid IBAN. */
    sepa_iban?: string
    sepa_iban_account_name?: string
    /** Should be a valid BIC. */
    sepa_bic?: string
    /** Should be unique for the administration. */
    sepa_mandate_id?: string
    /** Should be a date in the past. */
    sepa_mandate_date?: Date
    sepa_sequence_type?: SepaSequenceType
    /** Should be a valid invoice {@link Workflow.id}. */
    invoice_workflow_id?: Identifier
    /** Should be a valid estimate {@link Workflow.id}. */
    estimate_workflow_id?: Identifier
    si_identifier_type?: SiIdentifierType
    si_identifier?: string
    direct_debit?: boolean
    custom_fields_attributes?: { id: Identifier, value: string }[]
}

export interface AddContactPersonOptions {
    firstname: string
    lastname: string
    phone?: string
    /** Should be a valid email address */
    email?: string
    department?: string
}

export interface UpdateContactPersonOptions {
    firstname?: string
    lastname?: string
    phone?: string
    /** Should be a valid email address */
    email?: string
    department?: string
}

export interface RequestPaymentsMandateOptions {
    /** Should be a valid {@link Identity.id}. */
    identity_id?: Identifier
    /** Should be a valid {@link Workflow.id}. Restricts the available payment methods to the methods available for the selected workflow. */
    workflow_id?: Identifier
}

export interface RequestPaymentsMandateEmailOptions extends RequestPaymentsMandateOptions {
    email_message?: string
}

export interface AddAdditionalChargeOptions {
    contact_id?: Identifier
    subscription_id?: Identifier
    product_id: Identifier
    detail_id?: Identifier
    amount?: string
    price: number
    period: Period
    description: string
}