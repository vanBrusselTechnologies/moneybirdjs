import {Filter} from "./lib";

export interface GeneralDocumentSearchOptions {
    page?: number,
    per_page?: number,
    exclude_new_general_journal_documents?: boolean,
    filter?: Filter,
    new_filter?: Filter,
}

export interface AddGeneralDocumentOptions {
    reference: string,
    date?: Date,
    due_date?: Date,
    reminder_date?: Date,
    /** Should be a valid contact id. */
    contact_id?: string
}

export interface UpdateGeneralDocumentOptions {
    reference?: string,
    date?: Date,
    due_date?: Date,
    reminder_date?: Date,
    /** Should be a valid contact id. */
    contact_id?: string
}