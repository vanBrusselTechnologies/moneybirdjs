import {APIProfitLossReport, LedgerAccountData} from "../types";

export class ProfitLossReport {
    public revenue_by_ledger_account: LedgerAccountData;
    public direct_costs_by_ledger_account: LedgerAccountData;
    public expenses_by_ledger_account: LedgerAccountData;
    public other_income_expenses_by_ledger_account: LedgerAccountData;
    public gross_profit: number;
    public operating_profit: number;
    public net_profit: number;
    public total_expenses: number;
    public total_revenue: number;

    constructor(data: APIProfitLossReport) {
        this.revenue_by_ledger_account = Object.fromEntries(Object.entries(data.revenue_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.direct_costs_by_ledger_account = Object.fromEntries(Object.entries(data.direct_costs_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.expenses_by_ledger_account = Object.fromEntries(Object.entries(data.expenses_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.other_income_expenses_by_ledger_account = Object.fromEntries(Object.entries(data.other_income_expenses_by_ledger_account).map(([k, v]) => [k, parseFloat(v)]));
        this.gross_profit = parseFloat(data.gross_profit);
        this.operating_profit = parseFloat(data.operating_profit);
        this.net_profit = parseFloat(data.net_profit);
        this.total_expenses = parseFloat(data.total_expenses);
        this.total_revenue = parseFloat(data.total_revenue);
    }
}