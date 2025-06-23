import {APIDocumentDetail, Entity} from "../types";

// noinspection JSUnusedGlobalSymbols
/** */
export class DocumentDetail {
    public id: string;
    public administration_id: string;
    public tax_rate_id: string;
    public ledger_account_id: string;
    public project_id: string | null;
    public product_id: string | null;
    public amount: string | null;
    public amount_decimal: number;
    public description: string;
    public price: number;
    public period: string | null;
    public row_order: number;
    public total_price_excl_tax_with_discount: number;
    public total_price_excl_tax_with_discount_base: number;
    public tax_report_reference: string[];
    public mandatory_tax_text: string | null;
    public created_at: Date;
    public updated_at: Date

    constructor(public entity: Entity, data: APIDocumentDetail) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.tax_rate_id = data.tax_rate_id;
        this.ledger_account_id = data.ledger_account_id;
        this.project_id = data.project_id;
        this.product_id = data.product_id;
        this.amount = data.amount;
        this.amount_decimal = parseFloat(data.amount_decimal);
        this.description = data.description;
        this.price = parseFloat(data.price);
        this.period = data.period;
        this.row_order = data.row_order;
        this.total_price_excl_tax_with_discount = parseFloat(data.total_price_excl_tax_with_discount);
        this.total_price_excl_tax_with_discount_base = parseFloat(data.total_price_excl_tax_with_discount_base);
        this.tax_report_reference = data.tax_report_reference;
        this.mandatory_tax_text = data.mandatory_tax_text;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}