import {Identifier, PagedOptions, Period} from "./lib";
import {APILedgerAccountType} from "./api";

/** Data grouped by {@link LedgerAccount.id} */
export type LedgerAccountData = { [l: Identifier]: number }
/** Data grouped by {@link LedgerAccount.id} */
export type GeneralLedgerReportGroupedData = {
    [l: Identifier]: { start_balance: number, debit_sums: number, credit_sums: number, final_balance: number }
}

export interface PagedAgingReportOptions extends PagedOptions {
    /**
     * A period until which a report should be generated.
     *
     * **Date range formats:**
     * - `YYYYMM` (e.g., `202501`)
     *
     * **Preset options:**
     * - `this_month` - Current month (default if not specified)
     * - `prev_month` - Previous month
     * - `this_quarter` - Current quarter
     * - `prev_quarter` - Previous quarter
     * - `this_year` - Current year
     * - `prev_year` - Previous year
     *
     * @default this_month
     */
    period_until: `${number}`
        | 'this_month'
        | 'prev_month'
        | 'this_quarter'
        | 'prev_quarter'
        | 'this_year'
        | 'prev_year'
}

export interface ReportOptions {
    /** The period can be a date range or one of the presets. Date ranges must consist of whole months (start on the 1st, end on the last day of a month). */
    period?: Period
}

export interface CashFlowReportOptions extends ReportOptions {
    /** Filter the cash flow report by a specific financial account */
    financial_account_id?: Identifier
}

export interface PagedReportOptions extends ReportOptions, PagedOptions {
}

export interface JournalEntriesReportOptions extends PagedReportOptions {
    /** Filter by project ID, use "null" to filter entries without a project */
    project_id?: Identifier
    /** Filter by contact ID, use "null" to filter entries without a contact */
    contact_id?: Identifier
    /** Filter by ledger account ID */
    ledger_account_id?: Identifier
    /** Filter by ledger account type */
    account_type?: APILedgerAccountType
}

export interface ProfitLossReportOptions extends ReportOptions {
    project_id?: Identifier
}