import {APISubscriptionsReport} from "../types";

export class SubscriptionsReport {
    public monthly_recurring_revenue: number;
    public annual_run_rate: number;
    public churn_rate: number;
    public lifetime_value: number;

    constructor(data: APISubscriptionsReport) {
        this.monthly_recurring_revenue = parseFloat(data.monthly_recurring_revenue)
        this.annual_run_rate = parseFloat(data.annual_run_rate)
        this.churn_rate = parseFloat(data.churn_rate)
        this.lifetime_value = parseFloat(data.lifetime_value)
    }
}