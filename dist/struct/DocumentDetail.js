"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentDetail = void 0;
class DocumentDetail {
    constructor(entity, data) {
        this.entity = entity;
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
exports.DocumentDetail = DocumentDetail;
