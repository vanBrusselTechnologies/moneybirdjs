import {ReportAgingContact} from ".";
import {APIDebtorsAgingReport} from "../types";

export class DebtorsAgingReport {
    public debtors: ReportAgingContact[];

    constructor(data: APIDebtorsAgingReport) {
        this.debtors = data.debtors.map(debtor => new ReportAgingContact(debtor));
    }
}