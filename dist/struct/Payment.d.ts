import { APIPayment, Document, FinancialMutation } from "../types";
export declare class Payment {
    entity: Document | FinancialMutation;
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
    credit_invoice_id: string;
    financial_mutation_id: string;
    ledger_account_id: string;
    linked_payment_id: null;
    manual_payment_action: null;
    created_at: Date;
    updated_at: Date;
    constructor(entity: Document | FinancialMutation, data: APIPayment);
}
