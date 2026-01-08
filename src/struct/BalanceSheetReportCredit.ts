import {BalanceSheetLedgerAccount} from ".";
import {APIBalanceSheetReportCredit} from "../types";

export class BalanceSheetReportCredit {
    public total: number;
    public equity: BalanceSheetLedgerAccount[];
    public provisions: BalanceSheetLedgerAccount[];
    public non_current_liabilities: BalanceSheetLedgerAccount[];
    public current_liabilities: BalanceSheetLedgerAccount[];
    /** Results per open year */
    public open_years: { year: number, value: number }[];

    constructor(data: APIBalanceSheetReportCredit) {
        this.total = parseFloat(data.total);
        this.equity = data.equity.map(child => new BalanceSheetLedgerAccount(child));
        this.provisions = data.provisions.map(child => new BalanceSheetLedgerAccount(child));
        this.non_current_liabilities = data.non_current_liabilities.map(child => new BalanceSheetLedgerAccount(child));
        this.current_liabilities = data.current_liabilities.map(child => new BalanceSheetLedgerAccount(child));
        this.open_years = data.open_years.map(child => {
            return {year: parseInt(child.year), value: parseFloat(child.value)}
        });
    }
}