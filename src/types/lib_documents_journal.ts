import {Filter} from "./lib";

export interface JournalDocumentSearchOptions {
    page?: number,
    per_page?: number,
    exclude_new_general_journal_documents?: boolean,
    filter?: Filter,
    new_filter?: Filter,
}

export interface AddJournalDocumentOptions {
    reference: string,
    date: Date,
    /** Can be api, upload, endpoint, si, si_local, si_peppol, email or moneybird_bv. */
    origin?: string,
    /** Can be fiscal_year_ending. */
    journal_type?: Date,
    general_journal_document_entries_attributes: JournalDocumentEntriesAttribute[]
}

export interface JournalDocumentEntriesAttribute {
    id?: string,
    /** Should be a valid ledger account id. */
    ledger_account_id?: string,
    /** Should be a valid tax rate id. */
    tax_rate_id?: string,
    description?: string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    debit?: number | string,
    /** Both a decimal and a string ‘10,95’ are accepted. */
    credit?: number | string,
    /** Should be a valid project id. */
    project_id?: string,
    row_order?: number,
    _destroy?: boolean,
    /** Should be a valid contact id. */
    contact_id?: string
}

export interface UpdateJournalDocumentOptions {
    reference?: string,
    date?: Date,
    /** Can be api, upload, endpoint, si, si_local, si_peppol, email or moneybird_bv. */
    origin?: string,
    /** Can be fiscal_year_ending. */
    journal_type?: Date,
    general_journal_document_entries_attributes?: JournalDocumentEntriesAttribute[]
}