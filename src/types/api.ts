import {CustomFieldSource} from "./lib";

export interface APIAdministration {
    "id": string,
    "name": string,
    "language": string,
    "currency": string,
    "country": string,
    "time_zone": string,
    "access": string
}

export interface APIContact {
    "id": string,
    "administration_id": string,
    "company_name": string,
    "firstname": string,
    "lastname": string,
    "address1": string,
    "address2": string,
    "zipcode": string,
    "city": string,
    "country": string,
    "phone": string,
    "delivery_method": string,
    "customer_id": string,
    "tax_number": string,
    "chamber_of_commerce": string,
    "bank_account": string,
    "attention": string,
    "email": string,
    "email_ubl": boolean,
    "send_invoices_to_attention": string,
    "send_invoices_to_email": string,
    "send_estimates_to_attention": string,
    "send_estimates_to_email": string,
    "sepa_active": boolean,
    "sepa_iban": string,
    "sepa_iban_account_name": string,
    "sepa_bic": string,
    "sepa_mandate_id": string,
    "sepa_mandate_date": string | null,
    "sepa_sequence_type": string,
    "credit_card_number": string,
    "credit_card_reference": string,
    "credit_card_type": null,
    "tax_number_validated_at": string | null,
    "tax_number_valid": boolean | null,
    "invoice_workflow_id": string | null,
    "estimate_workflow_id": string | null,
    "si_identifier": string,
    "si_identifier_type": string | null,
    "moneybird_payments_mandate": boolean,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "sales_invoices_url": string,
    "notes": APINote[],
    "custom_fields": APIContactCustomField[],
    "contact_people": APIContactPerson[],
    "archived": boolean,
    "events": APIEvent[]
}

export interface APINote {
    "id": string,
    "administration_id": string,
    "entity_id": string,
    "entity_type": string | "Contact",
    "user_id": string,
    "assignee_id": string,
    "todo": boolean,
    "note": string,
    "completed_at": null | string,
    "completed_by_id": null | string,
    "todo_type": null | string,
    "data": { [key: string]: string },
    "created_at": string,
    "updated_at": string
}

export interface APICustomField {
    "id": string,
    "administration_id": string,
    "name": string,
    "source": CustomFieldSource
}

export interface APIContactCustomField {
    "id": string,
    "name": string,
    "value": string
}

export interface APIContactPerson {
    "id": string,
    "administration_id": string,
    "firstname": string,
    "lastname": string,
    "phone": null | string,
    "email": null | string,
    "department": null | string,
    "created_at": string,
    "updated_at": string,
    "version": number
}

export interface APIEvent {
    "administration_id": string,
    "user_id": string,
    "action": string,
    "link_entity_id": null,
    "link_entity_type": null,
    "data": { [key: string]: string },
    "created_at": string,
    "updated_at": string
}

export interface APIDocumentStyle {
    "id": string,
    "administration_id": string,
    "name": string,
    "identity_id": string,
    "default": boolean,
    "logo_hash": string,
    "logo_container_full_width": boolean,
    "logo_display_width": number,
    "logo_position": string,
    "background_hash": string,
    "paper_size": string,
    "address_position": string,
    "font_size": 9 | 10 | 11 | 12,
    "font_family": string,
    "print_on_stationery": boolean,
    "custom_css": string,
    "invoice_sender_address": APIDocumentField[],
    "invoice_metadata_left": APIDocumentField[],
    "invoice_metadata_right": APIDocumentField[],
    "estimate_sender_address": APIDocumentField[],
    "estimate_metadata_left": APIDocumentField[],
    "estimate_metadata_right": APIDocumentField[],
    "created_at": string,
    "updated_at": string
}

export interface APIDocumentField {
    "field": string,
    "label"?: boolean,
    "bold"?: boolean,
    "italic"?: boolean
}

export type APIDocument =
    APIGeneralDocument
    | APIJournalDocument
    | APIPurchaseInvoice
    | APIReceipt
    | APITypelessDocument
    | APIExternalSalesInvoice
    | APISalesInvoice;

export interface APIGeneralDocument {
    "id": string,
    "administration_id": string,
    "contact_id": string | null,
    "contact": APIContact | null,
    "reference": string,
    "date": string,
    "due_date": string | null,
    "entry_number": number,
    "state": string,
    "exchange_rate": string,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[]
}

export interface APIAttachment {
    "id": string,
    "administration_id": string,
    "attachable_id": string,
    "attachable_type": string,
    "filename": string,
    "content_type": string,
    "size": number,
    "rotation": number,
    "created_at": string,
    "updated_at": string
}

export interface APIJournalDocument {
    "id": string,
    "administration_id": string,
    "reference": string,
    "date": string,
    "journal_type": null,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "general_journal_document_entries": APIJournalDocumentEntry[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[]
}

export interface APIJournalDocumentEntry {
    "id": string,
    "administration_id": string,
    "ledger_account_id": string,
    "project_id": string | null,
    "contact_id": string | null,
    "debit": string | number,
    "credit": string | number,
    "row_order": number,
    "created_at": string,
    "updated_at": string,
    "description": string
}

export interface APIPurchaseInvoice {
    "id": string,
    "administration_id": string,
    "contact_id": string,
    "reference": string,
    "date": string,
    "due_date": string | null,
    "entry_number": number,
    "state": string,
    "currency": string,
    "exchange_rate": string,
    "revenue_invoice": boolean,
    "prices_are_incl_tax": boolean,
    "origin": string,
    "paid_at": string | null,
    "tax_number": string,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "details": APIDocumentDetail[],
    "payments": APIPayment[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[]
}

export interface APIReceipt {
    "id": string,
    "administration_id": string,
    "contact_id": string,
    "reference": string,
    "date": string,
    "due_date": string | null,
    "entry_number": number,
    "state": string,
    "currency": string,
    "exchange_rate": string,
    "revenue_invoice": boolean,
    "prices_are_incl_tax": boolean,
    "origin": string,
    "paid_at": string | null,
    "tax_number": string,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "details": APIDocumentDetail[],
    "payments": APIPayment[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[]
}

export interface APIDocumentDetail {
    "id": string,
    "administration_id": string,
    "tax_rate_id": string,
    "ledger_account_id": string,
    "project_id": string | null,
    "product_id": string | null,
    "amount": string | null,
    "amount_decimal": string,
    "description": string,
    "price": string,
    "period": string | null,
    "row_order": number,
    "total_price_excl_tax_with_discount": string,
    "total_price_excl_tax_with_discount_base": string,
    "tax_report_reference": string[],
    "mandatory_tax_text": string | null,
    "created_at": string,
    "updated_at": string
}

export interface APITypelessDocument {
    "id": string,
    "administration_id": string,
    "contact_id": string,
    "reference": string,
    "date": string,
    "state": string,
    "origin": string,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "attachments": APIAttachment[],
    "events": APIEvent[]
}

export interface APIEstimate {
    "id": string,
    "administration_id": string,
    "contact_id": string | null,
    "contact": APIContact | null,
    "contact_person_id": string | null,
    "contact_person": APIContactPerson | null,
    "estimate_id": string,
    "workflow_id": string;
    "document_style_id": string;
    "identity_id": string;
    "draft_id": string | null;
    "state": string,
    "estimate_date": string,
    "due_date": string | null,
    "reference": string,
    "language": string,
    "currency": string,
    "exchange_rate": string,
    "discount": string | null,
    "original_estimate_id": string | null,
    "show_tax": boolean,
    "sign_online": boolean,
    "sent_at": string | null,
    "accepted_at": string | null,
    "rejected_at": string | null,
    "archived_at": string | null,
    "created_at": string,
    "updated_at": string,
    "public_view_code": string,
    "public_view_code_expires_at": string,
    "version": number,
    "pre_text": string,
    "post_text": string,
    "details": APIDocumentDetail[],
    "prices_are_incl_tax": boolean,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "total_discount": string,
    "url": string,
    "custom_fields": APIInvoiceCustomField[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[],
    "tax_totals": APITaxTotals[]
}

export interface APITaxTotals {
    "tax_rate_id": string,
    "taxable_amount": string,
    "taxable_amount_base": string,
    "tax_amount": string,
    "tax_amount_base": string
}

export interface APIExternalSalesInvoice {
    "id": string,
    "administration_id": string,
    "contact_id": string | null,
    "contact": APIContact | null,
    "date": string,
    "state": "new" | "open" | "late" | "paid",
    "due_date": string | null,
    "reference": string,
    "entry_number": number,
    "origin": string | null,
    "source": string,
    "source_url": string,
    "currency": string,
    "paid_at": string | null,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "details": APIDocumentDetail[],
    "payments": APIPayment[],
    "total_paid": string,
    "total_unpaid": string,
    "total_unpaid_base": string,
    "prices_are_incl_tax": boolean,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "marked_dubious_on": string | null,
    "marked_uncollectible_on": string | null,
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[],
    "tax_totals": APITaxTotals[]
}

export interface APIFinancialAccount {
    "id": string,
    "administration_id": string,
    "type": string,
    "name": string,
    "identifier": string,
    "currency": string,
    "provider": string | null,
    "active": boolean,
    "created_at": string,
    "updated_at": string
}

export interface APIFinancialMutationSepaFields {
    sref?: string,
    isdt?: string,
    benm?: { name: string, id: string },
    ordp?: { name: string, id: string },
    crdb?: string,
    eref?: string,
    iban?: string,
    bic?: string,
    name?: string,
    city?: string,
    remi?: string
}

export interface APIFinancialMutationLedgerAccountBooking {
    "id": string,
    "administration_id": string,
    "ledger_account_id": string,
    "project_id": string | null,
    "description": string,
    "price": string,
    "created_at": string,
    "updated_at": string
}

export interface APIFinancialMutation {
    "id": string,
    "administration_id": string,
    "amount": string,
    "code": string | null,
    "date": string,
    "message": string,
    "contra_account_name": string | null,
    "contra_account_number": string,
    "state": "unprocessed" | "processed",
    "amount_open": string,
    "sepa_fields": APIFinancialMutationSepaFields | null,
    "batch_reference": string | null,
    "financial_account_id": string,
    "currency": string,
    "original_amount": null,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "financial_statement_id": string,
    "processed_at": string | null,
    "account_servicer_transaction_id": string | null,
    "payments": APIPayment[],
    "ledger_account_bookings": APIFinancialMutationLedgerAccountBooking[]
}

export interface APIFinancialStatement {
    "id": string,
    "financial_account_id": string,
    "reference": string,
    "official_date": string | null,
    "official_balance": string | null,
    "importer_service": string | null,
    "financial_mutations": APIFinancialMutation[]
}

export interface APIIdentity {
    "id": string,
    "administration_id": string,
    "company_name": string,
    "city": string,
    "country": string,
    "zipcode": string,
    "address1": string,
    "address2": string,
    "email": string,
    "phone": string,
    "bank_account_name": string,
    "bank_account_number": string,
    "bank_account_bic": string,
    "custom_fields": APIIdentityCustomField[],
    "updated_at": string,
    "created_at": string,
    "chamber_of_commerce": string,
    "tax_number": string
}

export interface APIIdentityCustomField {
    "id": string,
    "name": string,
    "value": string
}

export type APILedgerAccountType =
    "non_current_assets"
    | "current_assets"
    | "equity"
    | "provisions"
    | "non_current_liabilities"
    | "current_liabilities"
    | "revenue"
    | "direct_costs"
    | "expenses"
    | "other_income_expenses";
export type APILedgerAccountAllowedDocumentTypes =
    "purchase_invoice"
    | "sales_invoice"
    | "financial_mutation"
    | "general_journal_document"
    | "payment"

export interface APILedgerAccount {
    "id": string,
    "administration_id": string,
    "name": string,
    "account_type": APILedgerAccountType,
    "account_id": string | null,
    "parent_id": string | null,
    "created_at": string,
    "updated_at": string,
    "allowed_document_types": APILedgerAccountAllowedDocumentTypes[],
    "description"?: string
}

export interface APIPayment {
    "id": string,
    "administration_id": string,
    "invoice_type": string,
    "invoice_id": string,
    "financial_account_id": string,
    "user_id": string,
    "payment_transaction_id": string | null,
    "transaction_identifier": null,
    "price": string,
    "price_base": string,
    "payment_date": string,
    "credit_invoice_id": string | null,
    "financial_mutation_id": string,
    "ledger_account_id": string,
    "linked_payment_id": null,
    "manual_payment_action": null,
    "created_at": string,
    "updated_at": string
}

export interface APIProduct {
    "id": string,
    "administration_id": string,
    "description": string | null,
    "title": string | null,
    "identifier": string | null,
    "price": string,
    "currency": string,
    "frequency": number | null,
    "frequency_type": "day" | "week" | "month" | "quarter" | "year" | null,
    "tax_rate_id": string,
    "ledger_account_id": string,
    "created_at": string,
    "updated_at": string
}

export interface APIProject {
    "id": string,
    "name": string,
    "state": "archived" | "active",
    "budget": string
}

export interface APIPurchaseTransaction {
    "id": string,
    "administration_id": string,
    "financial_account_id": string,
    "payment_instrument_id": string | null,
    "state": "open" | "pending_payment" | "paid" | "cancelled",
    "sepa_iban": string,
    "sepa_iban_account_name": string,
    "sepa_bic": string,
    "source_sepa_iban": string,
    "source_sepa_iban_account_name": string,
    "date": string | null,
    "description": string,
    "end_to_end_id": string,
    "amount": string,
    "created_at": string,
    "updated_at": string,
    "payable_type": string | "Document",
    "payable_id": string,
    "payment_method": string | 'qr' | null
}

export interface APIRecurringSalesInvoice {
    "id": string,
    "administration_id": string,
    "contact_id": string,
    "contact": APIContact,
    "contact_person_id": string | null,
    "contact_person": APIContactPerson | null,
    "workflow_id": string,
    "start_date": string,
    "invoice_date": string,
    "last_date": string,
    "active": boolean,
    "payment_conditions": string,
    "reference": string,
    "language": string,
    "currency": string,
    "discount": string,
    "first_due_interval": number,
    "auto_send": false,
    "sending_scheduled_at": string | null,
    "sending_scheduled_user_id": string | null,
    "frequency_type": "day" | "week" | "month" | "quarter" | "year",
    "frequency": number,
    "created_at": string,
    "updated_at": string,
    "version": number,
    "prices_are_incl_tax": false,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "details": APIDocumentDetail[],
    "custom_fields": APIInvoiceCustomField[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[],
    "subscription": APISubscription
}

export interface APISalesInvoice {
    "id": string,
    "administration_id": string,
    "contact_id": string,
    "contact": APIContact,
    "contact_person_id": string | null,
    "contact_person": APIContactPerson | null,
    "invoice_id": string,
    "recurring_sales_invoice_id": string | null,
    "workflow_id": string,
    "document_style_id": string,
    "identity_id": string,
    "draft_id": string | null,
    "state": string,
    "invoice_date": string,
    "due_date": string | null,
    "payment_conditions": string,
    "payment_reference": string,
    "short_payment_reference": string,
    "reference": string,
    "language": string,
    "currency": string,
    "discount": string,
    "original_sales_invoice_id": string | null,
    "paused": boolean,
    "paid_at": string | null,
    "sent_at": string | null,
    "created_at": string,
    "updated_at": string,
    "public_view_code": string,
    "public_view_code_expires_at": string,
    "version": number,
    "details": APIDocumentDetail[],
    "payments": APIPayment[],
    "total_paid": string,
    "total_unpaid": string,
    "total_unpaid_base": string,
    "prices_are_incl_tax": boolean,
    "total_price_excl_tax": string,
    "total_price_excl_tax_base": string,
    "total_price_incl_tax": string,
    "total_price_incl_tax_base": string,
    "total_discount": string,
    "marked_dubious_on": string | null,
    "marked_uncollectible_on": string | null,
    "reminder_count": number,
    "next_reminder": string | null,
    "original_estimate_id": string | null,
    "url": string,
    "payment_url": string,
    "custom_fields": APIInvoiceCustomField[],
    "notes": APINote[],
    "attachments": APIAttachment[],
    "events": APIEvent[],
    "tax_totals": APITaxTotals[]
}

export interface APIInvoiceCustomField {
    "id": string,
    "name": string,
    "value": string
}

//todo: APISubscription
export interface APISubscription {
}

export interface APITaxRate {
    "id": string,
    "administration_id": string,
    "name": string,
    "percentage": string,
    "tax_rate_type": "general_journal_document" | "purchase_invoice" | "sales_invoice",
    "show_tax": boolean,
    "active": boolean,
    "country": null,
    "created_at": string,
    "updated_at": string
}

//todo: APITimeEntry
export interface APITimeEntry {
}

export type APIUserPermissions =
    'sales_invoices'
    | 'documents'
    | 'estimates'
    | 'bank'
    | 'settings'
    | 'ownership'
    | 'time_entries'

export interface APIUser {
    "id": string,
    "name": string,
    "created_at": string,
    "updated_at": string,
    "email"?: string,
    "email_validated"?: boolean,
    "language"?: string,
    "time_zone"?: string,
    "permissions"?: APIUserPermissions[]
}

export interface APIVerification {
    "emails"?: string[],
    "bank_account_numbers"?: string[],
    "chamber_of_commerce_number"?: string,
    "tax_number"?: string
}

export interface APIWebhook {
    "id": string,
    "administration_id": string,
    "url": string,
    "enabled_events": APIEvent[],
    "last_http_status": null,
    "last_http_body": null,
    "token": string;
}

export interface APIWorkflow {
    "id": string,
    "administration_id": string,
    "type": "EstimateWorkflow" | "InvoiceWorkflow",
    "name": string,
    "default": boolean,
    "currency": string,
    "language": string,
    "active": boolean,
    "prices_are_incl_tax": boolean,
    "created_at": string,
    "updated_at": string
}