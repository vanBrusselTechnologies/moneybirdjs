import {APIReportTaxRate, Identifier} from "../types";

export class ReportTaxRate {
    public tax_rate_id: Identifier;
    public name: string;
    public percentage: number;
    public report_reference: string;
    public amount: number;
    public type: string;
    public tax: number;

    constructor(data: APIReportTaxRate) {
        this.tax_rate_id = data.tax_rate_id;
        this.name = data.name;
        this.percentage = parseFloat(data.percentage ?? "0");
        this.report_reference = data.report_reference;
        this.amount = parseFloat(data.amount);
        this.type = data.type;
        this.tax = parseFloat(data.tax);
    }
}