import {BalanceSheetReportCredit, BalanceSheetReportDebit} from ".";
import {APIBalanceSheetReport} from "../types";

export class BalanceSheetReport {
    public debit: BalanceSheetReportDebit;
    public credit: BalanceSheetReportCredit;

    constructor(data: APIBalanceSheetReport) {
        this.debit = new BalanceSheetReportDebit(data.debit)
        this.credit = new BalanceSheetReportCredit(data.credit)
    }
}