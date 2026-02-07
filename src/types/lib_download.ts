import {PagedOptions} from "./lib";

export type DownloadType =
    'auditfile'
    | 'brugstaat'
    | 'export_bank_statement'
    | 'export_contacts'
    | 'export_documents'
    | 'export_ledger_account_report'
    | 'export_sales_invoices'
    | string;

export interface DownloadFilterOptions extends PagedOptions {
    /**
     * Filter downloads by type. Common download types include:
     * - `auditfile`
     * - `brugstaat`
     * - `export_ledger_account_report`
     *
     * Check the `download_type` field in the response to see all available types.
     */
    download_type?: DownloadType
    downloaded?: boolean
    failed?: boolean
}