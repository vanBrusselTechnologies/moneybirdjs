import {APICashFlowReport, LedgerAccountData} from "../types";

export class CashFlowReport {
    public cash_received_by_ledger_account: LedgerAccountData;
    public cash_paid_by_ledger_account: LedgerAccountData;
    public opening_balance: number;
    public closing_balance: number;

    constructor(data: APICashFlowReport) {
        this.cash_received_by_ledger_account = Object.fromEntries(Object.entries(data.cash_received_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.cash_paid_by_ledger_account = Object.fromEntries(Object.entries(data.cash_paid_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.opening_balance = parseFloat(data.opening_balance);
        this.closing_balance = parseFloat(data.closing_balance);
    }
}