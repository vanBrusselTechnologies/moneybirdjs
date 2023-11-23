import { Administration, APITaxRate } from "../types";
export declare class TaxRate {
    administration: Administration;
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
    constructor(administration: Administration, data: APITaxRate);
}
