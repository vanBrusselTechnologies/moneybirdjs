import {APIReportContact, Identifier} from "../types";

export class ReportContact {
    public contact_id: Identifier | null;
    public amount: number;

    constructor(data: APIReportContact) {
        this.contact_id = data.contact_id;
        this.amount = parseFloat(data.amount);
    }
}