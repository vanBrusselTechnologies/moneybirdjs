import {APIPayment} from "../types";

export class Payment {
    id: string;
    administration_id: string;
    invoice_type: string;
    invoice_id: string;
    financial_account_id: string;
    user_id: string;
    payment_transaction_id: string | null;
    transaction_identifier: null;
    price: number;
    price_base: number;
    payment_date: Date;
    credit_invoice_id: string | null;
    financial_mutation_id: string;
    ledger_account_id: string;
    linked_payment_id: null;
    manual_payment_action: null;
    created_at: Date;
    updated_at: Date;

    constructor(data: APIPayment) {
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
        this.credit_invoice_id = data.credit_invoice_id;
        this.financial_mutation_id = data.financial_mutation_id;
        this.ledger_account_id = data.ledger_account_id;
        this.linked_payment_id = data.linked_payment_id;
        this.manual_payment_action = data.manual_payment_action;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}