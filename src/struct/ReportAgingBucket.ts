import {APIReportAgingBucket} from "../types";

export class ReportAgingBucket {
    /** The aging bucket name, e.g. '< 30 days', '30-60 days', '60+ days' */
    public name: string;
    public amount: number;

    constructor(data: APIReportAgingBucket) {
        this.name = data.name
        this.amount = parseFloat(data.amount)
    }
}