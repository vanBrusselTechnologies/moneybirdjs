import {ReportContact} from ".";
import {APICreditorsReport} from "../types";

export class CreditorsReport {
    public creditors: ReportContact[];

    constructor(data: APICreditorsReport) {
        this.creditors = data.creditors.map(creditor => new ReportContact(creditor));
    }
}