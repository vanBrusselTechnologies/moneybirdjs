import {ReportContact} from ".";
import {APIDebtorsReport} from "../types";

export class DebtorsReport {
    public creditors: ReportContact[];

    constructor(data: APIDebtorsReport) {
        this.creditors = data.debtors.map(debtor => new ReportContact(debtor));
    }
}