import { APIFinancialMutation, APIFinancialMutationSepaFields, FinancialMutationLinkBookingOptions, FinancialMutationUnlinkBookingOptions } from "../types";
import { Administration } from "./Administration";
import { Payment } from "./Payment";
/** */
export declare class FinancialMutation {
    administration: Administration;
    id: string;
    administration_id: string;
    amount: number;
    code: string | null;
    date: Date;
    message: string;
    contra_account_name: string | null;
    contra_account_number: string;
    state: "unprocessed" | "processed";
    amount_open: number;
    sepa_fields: APIFinancialMutationSepaFields | null;
    batch_reference: string | null;
    financial_account_id: string;
    currency: string;
    original_amount: null;
    created_at: Date;
    updated_at: Date;
    version: number;
    financial_statement_id: string;
    processed_at: Date | null;
    account_servicer_transaction_id: string | null;
    payments: Payment[];
    constructor(administration: Administration, data: APIFinancialMutation);
    /** Linking a booking to a financial mutations allows you to process financial mutations. Financial mutations can be linked to invoices, documents, ledger accounts and payment batches. */
    linkBooking(options: FinancialMutationLinkBookingOptions): Promise<void>;
    unlinkBooking(options: FinancialMutationUnlinkBookingOptions): Promise<void>;
}
