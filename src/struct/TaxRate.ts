import {APITaxRate} from "../types";

export class TaxRate {
    id: string;
    administration_id: string;
    name: string;
    percentage: number;
    tax_rate_type: "general_journal_document" | "purchase_invoice" | "sales_invoice";
    show_tax: boolean;
    active: boolean;
    country: null;
    created_at: Date;
    updated_at: Date;

    constructor(data: APITaxRate) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.percentage = parseFloat(data.percentage);
        this.tax_rate_type = data.tax_rate_type;
        this.show_tax = data.show_tax;
        this.active = data.active;
        this.country = data.country;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}