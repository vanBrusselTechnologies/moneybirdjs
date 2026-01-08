import {APIGeneralLedgerReport, GeneralLedgerReportGroupedData, Identifier, LedgerAccountData} from "../types";

export class GeneralLedgerReport {
    public start_balance: LedgerAccountData;
    public debit_sums: LedgerAccountData;
    public credit_sums: LedgerAccountData;
    public final_balance: LedgerAccountData;

    private _groupedByLedger?: GeneralLedgerReportGroupedData;

    constructor(data: APIGeneralLedgerReport) {
        this.start_balance = Object.fromEntries(Object.entries(data.start_balance).map(([k, v]) => [k, parseFloat(v)]));
        this.debit_sums = Object.fromEntries(Object.entries(data.debit_sums).map(([k, v]) => [k, parseFloat(v)]));
        this.credit_sums = Object.fromEntries(Object.entries(data.credit_sums).map(([k, v]) => [k, parseFloat(v)]));
        this.final_balance = Object.fromEntries(Object.entries(data.final_balance).map(([k, v]) => [k, parseFloat(v)]));
    }

    groupByLedger(): GeneralLedgerReportGroupedData {
        if (this._groupedByLedger !== undefined) return this._groupedByLedger;
        const keys = [...Object.keys(this.start_balance), ...Object.keys(this.debit_sums), ...Object.keys(this.credit_sums), ...Object.keys(this.final_balance)]
        this._groupedByLedger = Object.fromEntries(keys.map(k => {
            const ledgerId = k as Identifier
            return [k, {
                start_balance: this.start_balance[ledgerId] ?? 0,
                debit_sums: this.debit_sums[ledgerId] ?? 0,
                credit_sums: this.credit_sums[ledgerId] ?? 0,
                final_balance: this.final_balance[ledgerId] ?? 0
            }]
        }));
        return this._groupedByLedger
    }
}