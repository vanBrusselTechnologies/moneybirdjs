import { AddAttachmentOptions, AddNoteOptions, APISalesInvoice, SendSalesInvoiceOptions, UpdateSalesInvoiceOptions } from "../types";
import { Administration } from "./Administration";
import { Note } from "./Note";
import { Event } from "./Event";
import { Attachment } from "./Attachment";
import { DocumentDetail } from "./DocumentDetail";
import { InvoiceCustomField } from "./InvoiceCustomField";
import { Payment } from "./Payment";
/** */
export declare class SalesInvoice {
    administration: Administration;
    id: string;
    administration_id: string;
    contact_id: string;
    contact_person_id: string | null;
    invoice_id: string;
    recurring_sales_invoice_id: string | null;
    workflow_id: string;
    document_style_id: string;
    identity_id: string;
    draft_id: string | null;
    state: string;
    invoice_date: Date;
    due_date: Date | null;
    payment_conditions: string;
    payment_reference: string;
    short_payment_reference: string;
    reference: string;
    language: string;
    currency: string;
    discount: number;
    original_sales_invoice_id: string | null;
    paused: boolean;
    paid_at: Date | null;
    sent_at: Date | null;
    created_at: Date;
    updated_at: Date;
    public_view_code: string;
    public_view_code_expires_at: Date;
    version: number;
    details: DocumentDetail[];
    payments: Payment[];
    total_paid: number;
    total_unpaid: number;
    total_unpaid_base: number;
    prices_are_incl_tax: boolean;
    total_price_excl_tax: number;
    total_price_excl_tax_base: number;
    total_price_incl_tax: number;
    total_price_incl_tax_base: number;
    total_discount: number;
    marked_dubious_on: Date | null;
    marked_uncollectible_on: Date | null;
    reminder_count: number;
    next_reminder: Date | null;
    original_estimate_id: string | null;
    url: string;
    payment_url: string;
    custom_fields: InvoiceCustomField[];
    notes: Note[];
    attachments: Attachment[];
    events: Event[];
    constructor(administration: Administration, data: APISalesInvoice);
    update(options: UpdateSalesInvoiceOptions): Promise<this>;
    delete(): Promise<void>;
    addNote(options: AddNoteOptions): Promise<Note>;
    deleteNote(noteId: string): Promise<void>;
    addAttachment(options: AddAttachmentOptions): Promise<void>;
    deleteAttachment(attachmentId: string): Promise<void>;
    private setData;
    /**
     * This endpoint provides two options: sending the invoice and scheduling sending in the future. When sending now, you can provide a send method, email address and message. If you don’t provide any arguments, the defaults from the contact and workflow will be used.
     *
     * When scheduling sending, set the boolean sending_scheduled to true and provide an invoice_date.
     */
    send(options?: SendSalesInvoiceOptions): Promise<this>;
    registerPaymentCreditInvoice(): Promise<this>;
    /** */
    duplicateToCreditInvoice(): Promise<SalesInvoice>;
}
