import {ReportAgingBucket, ReportContact} from ".";
import {APIReportAgingContact} from "../types";

export class ReportAgingContact extends ReportContact {
    public aging_buckets: ReportAgingBucket[];

    constructor(data: APIReportAgingContact) {
        super(data);
        this.aging_buckets = data.aging_buckets.map(bucket => new ReportAgingBucket(bucket));
    }
}