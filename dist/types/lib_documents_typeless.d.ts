import { Filter } from "./lib";
export interface TypelessDocumentSearchOptions {
    page?: number;
    per_page?: number;
    exclude_new_general_journal_documents?: boolean;
    filter?: Filter;
    new_filter?: Filter;
}
export interface AddTypelessDocumentOptions {
    reference: string;
    date?: Date;
    /** Should be a valid contact id. */
    contact_id?: string;
}
