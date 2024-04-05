"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialMutation = void 0;
const Payment_1 = require("./Payment");
// noinspection JSUnusedGlobalSymbols
/** */
class FinancialMutation {
    //ledger_account_bookings: FinancialMutationLedgerAccountBooking[]
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.amount = parseFloat(data.amount);
        this.code = data.code;
        this.date = new Date(data.date);
        this.message = data.message;
        this.contra_account_name = data.contra_account_name;
        this.contra_account_number = data.contra_account_number;
        this.state = data.state;
        this.amount_open = parseFloat(data.amount_open);
        this.sepa_fields = data.sepa_fields;
        this.batch_reference = data.batch_reference;
        this.financial_account_id = data.financial_account_id;
        this.currency = data.currency;
        this.original_amount = data.original_amount;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.created_at);
        this.version = data.version;
        this.financial_statement_id = data.financial_statement_id;
        this.processed_at = data.processed_at ? new Date(data.processed_at) : null;
        this.account_servicer_transaction_id = data.account_servicer_transaction_id;
        this.payments = data.payments.map(p => new Payment_1.Payment(this, p));
        //this.ledger_account_bookings = data.ledger_account_bookings.(l => new LedgerAccountBooking(this, l));
    }
    /** Linking a booking to a financial mutations allows you to process financial mutations. Financial mutations can be linked to invoices, documents, ledger accounts and payment batches. */
    async linkBooking(options) {
        await this.administration.client.rest.financialMutationLinkBooking(this, options);
    }
    async unlinkBooking(options) {
        await this.administration.client.rest.financialMutationUnlinkBooking(this, options);
    }
}
exports.FinancialMutation = FinancialMutation;
