"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
class Payment {
    constructor(entity, data) {
        this.entity = entity;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.invoice_type = data.invoice_type;
        this.invoice_id = data.invoice_id;
        this.financial_account_id = data.financial_account_id;
        this.user_id = data.user_id;
        this.payment_transaction_id = data.payment_transaction_id;
        this.transaction_identifier = data.transaction_identifier;
        this.price = parseFloat(data.price);
        this.price_base = parseFloat(data.price_base);
        this.payment_date = new Date(data.payment_date);
        this.credit_invoice_id = data.invoice_id;
        this.financial_mutation_id = data.financial_mutation_id;
        this.ledger_account_id = data.ledger_account_id;
        this.linked_payment_id = data.linked_payment_id;
        this.manual_payment_action = data.manual_payment_action;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}
exports.Payment = Payment;
