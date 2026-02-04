import {ReportContact} from ".";
import {APIDebtorsReport} from "../types";

export class DebtorsReport {
    public debtors: ReportContact[];

    constructor(data: APIDebtorsReport) {
        this.debtors = data.debtors.map(debtor => new ReportContact(debtor));
    }
}