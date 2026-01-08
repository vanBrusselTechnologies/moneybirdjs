import {ReportContact} from ".";
import {APIExpensesByContactReport} from "../types";

export class ExpensesByContactReport {
    public expenses_by_contact: ReportContact[];

    constructor(data: APIExpensesByContactReport) {
        this.expenses_by_contact = data.expenses_by_contact.map(contact => new ReportContact(contact));
    }
}