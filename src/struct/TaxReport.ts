import {ReportTaxRate} from ".";
import {APITaxReport} from "../types";

export class TaxReport {
    public tax_rates: ReportTaxRate[];

    constructor(data: APITaxReport) {
        this.tax_rates = data.tax_rates.map(taxRate => new ReportTaxRate(taxRate));
    }
}