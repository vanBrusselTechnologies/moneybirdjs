import {BalanceSheetLedgerAccount} from ".";
import {APIBalanceSheetReportDebit} from "../types";

export class BalanceSheetReportDebit {
    public total: number;
    public current_assets: BalanceSheetLedgerAccount[];
    public non_current_assets: BalanceSheetLedgerAccount[];

    constructor(data: APIBalanceSheetReportDebit) {
        this.total = parseFloat(data.total);
        this.current_assets = data.current_assets.map(child => new BalanceSheetLedgerAccount(child));
        this.non_current_assets = data.non_current_assets.map(child => new BalanceSheetLedgerAccount(child));
    }
}