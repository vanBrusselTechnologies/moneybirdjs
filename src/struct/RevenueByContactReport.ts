import {ReportContact} from ".";
import {APIRevenueByContactReport} from "../types";

export class RevenueByContactReport {
    public revenue_by_contact: ReportContact[];

    constructor(data: APIRevenueByContactReport) {
        this.revenue_by_contact = data.revenue_by_contact.map(contact => new ReportContact(contact));
    }
}