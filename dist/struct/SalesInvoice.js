"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesInvoice = void 0;
const Note_1 = require("./Note");
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
const DocumentDetail_1 = require("./DocumentDetail");
const InvoiceCustomField_1 = require("./InvoiceCustomField");
const Payment_1 = require("./Payment");
// noinspection JSUnusedGlobalSymbols
/** */
class SalesInvoice {
    //public tax_totals: TaxTotals[]
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.contact_person_id = data.contact_person_id;
        this.invoice_id = data.invoice_id;
        this.recurring_sales_invoice_id = data.recurring_sales_invoice_id;
        this.workflow_id = data.workflow_id;
        this.document_style_id = data.document_style_id;
        this.identity_id = data.identity_id;
        this.draft_id = data.draft_id;
        this.state = data.state;
        this.invoice_date = new Date(data.invoice_date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.payment_conditions = data.payment_conditions;
        this.payment_reference = data.payment_reference;
        this.short_payment_reference = data.short_payment_reference;
        this.reference = data.reference;
        this.language = data.language;
        this.currency = data.currency;
        this.discount = parseFloat(data.discount);
        this.original_sales_invoice_id = data.original_sales_invoice_id;
        this.paused = data.paused;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.sent_at = data.sent_at ? new Date(data.sent_at) : null;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.public_view_code = data.public_view_code;
        this.public_view_code_expires_at = new Date(data.public_view_code_expires_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
        this.total_paid = parseFloat(data.total_paid);
        this.total_unpaid = parseFloat(data.total_unpaid);
        this.total_unpaid_base = parseFloat(data.total_unpaid_base);
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.total_discount = parseFloat(data.total_discount);
        this.marked_dubious_on = data.marked_dubious_on ? new Date(data.marked_dubious_on) : null;
        this.marked_uncollectible_on = data.marked_uncollectible_on ? new Date(data.marked_uncollectible_on) : null;
        this.reminder_count = data.reminder_count;
        this.next_reminder = data.next_reminder ? new Date(data.next_reminder) : null;
        this.original_estimate_id = data.original_estimate_id;
        this.url = data.url;
        this.payment_url = data.payment_url;
        this.custom_fields = data.custom_fields.map(n => new InvoiceCustomField_1.InvoiceCustomField(this, n));
        this.payments = data.payments.map(p => new Payment_1.Payment(this, p));
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
    async update(options) {
        const { data } = await this.administration.client.rest.updateDocument(this, options);
        this.setData(data);
        return this;
    }
    async delete() {
        await this.administration.deleteExternalSalesInvoice(this.id);
    }
    async addNote(options) {
        const { data } = await this.administration.client.rest.addNote(this, options);
        const note = new Note_1.Note(this, data);
        this.notes.push(note);
        return note;
    }
    async deleteNote(noteId) {
        await this.administration.client.rest.deleteNote(this, noteId);
        this.notes = this.notes.filter(n => n.id !== noteId);
    }
    async addAttachment(options) {
        return (await this.administration.client.rest.addAttachment(this, options)).data;
    }
    async deleteAttachment(attachmentId) {
        await this.administration.client.rest.deleteAttachment(this, attachmentId);
        this.attachments = this.attachments.filter(a => a.id !== attachmentId);
    }
    setData(data) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.contact_person_id = data.contact_person_id;
        this.invoice_id = data.invoice_id;
        this.recurring_sales_invoice_id = data.recurring_sales_invoice_id;
        this.workflow_id = data.workflow_id;
        this.document_style_id = data.document_style_id;
        this.identity_id = data.identity_id;
        this.draft_id = data.draft_id;
        this.state = data.state;
        this.invoice_date = new Date(data.invoice_date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.payment_conditions = data.payment_conditions;
        this.payment_reference = data.payment_reference;
        this.short_payment_reference = data.short_payment_reference;
        this.reference = data.reference;
        this.language = data.language;
        this.currency = data.currency;
        this.discount = parseFloat(data.discount);
        this.original_sales_invoice_id = data.original_sales_invoice_id;
        this.paused = data.paused;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.sent_at = data.sent_at ? new Date(data.sent_at) : null;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.public_view_code = data.public_view_code;
        this.public_view_code_expires_at = new Date(data.public_view_code_expires_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
        this.total_paid = parseFloat(data.total_paid);
        this.total_unpaid = parseFloat(data.total_unpaid);
        this.total_unpaid_base = parseFloat(data.total_unpaid_base);
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.total_discount = parseFloat(data.total_discount);
        this.marked_dubious_on = data.marked_dubious_on ? new Date(data.marked_dubious_on) : null;
        this.marked_uncollectible_on = data.marked_uncollectible_on ? new Date(data.marked_uncollectible_on) : null;
        this.reminder_count = data.reminder_count;
        this.next_reminder = data.next_reminder ? new Date(data.next_reminder) : null;
        this.original_estimate_id = data.original_estimate_id;
        this.url = data.url;
        this.payment_url = data.payment_url;
        this.custom_fields = data.custom_fields.map(n => new InvoiceCustomField_1.InvoiceCustomField(this, n));
        this.payments = data.payments.map(p => new Payment_1.Payment(this, p));
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_pdf */
    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_ubl */
    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_packing_slip_pdf */
    /**
     * This endpoint provides two options: sending the invoice and scheduling sending in the future. When sending now, you can provide a send method, email address and message. If you don’t provide any arguments, the defaults from the contact and workflow will be used.
     *
     * When scheduling sending, set the boolean sending_scheduled to true and provide an invoice_date.
     */
    async send(options) {
        const { data } = await this.administration.client.rest.sendInvoice(this, options);
        this.setData(data);
        return this;
    }
    async registerPaymentCreditInvoice() {
        const { data } = await this.administration.client.rest.registerPaymentCreditInvoice(this);
        this.setData(data);
        return this;
    }
    /* todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_id_pause */
    /* todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_id_resume */
    /** */
    async duplicateToCreditInvoice() {
        const { data } = await this.administration.client.rest.duplicateToCreditInvoice(this);
        return new SalesInvoice(this.administration, data);
    }
}
exports.SalesInvoice = SalesInvoice;
