import {
    AddAttachmentOptions,
    AddNoteOptions, AddPaymentOptions,
    APISalesInvoice,
    SendSalesInvoiceOptions,
    UpdateSalesInvoiceOptions
} from "../types";
import {Administration, Attachment, DocumentDetail, Event, Note, InvoiceCustomField, Payment} from '.'

// noinspection JSUnusedGlobalSymbols
/** */
export class SalesInvoice {
    public id: string;
    public administration_id: string;
    public contact_id: string;
    //public contact: Contact;
    public contact_person_id: string | null;
    //public contact_person: ContactPerson | null;
    public invoice_id: string;
    public recurring_sales_invoice_id: string | null;
    public workflow_id: string;
    public document_style_id: string;
    public identity_id: string;
    public draft_id: string | null;
    public state: string;
    public invoice_date: Date;
    public due_date: Date | null;
    public payment_conditions: string;
    public payment_reference: string;
    public short_payment_reference: string;
    public reference: string;
    public language: string;
    public currency: string;
    public discount: number;
    public original_sales_invoice_id: string | null;
    public paused: boolean;
    public paid_at: Date | null;
    public sent_at: Date | null;
    public created_at: Date;
    public updated_at: Date;
    public public_view_code: string;
    public public_view_code_expires_at: Date;
    public version: number;
    public details: DocumentDetail[];
    public payments: Payment[];
    public total_paid: number;
    public total_unpaid: number;
    public total_unpaid_base: number;
    public prices_are_incl_tax: boolean;
    public total_price_excl_tax: number;
    public total_price_excl_tax_base: number;
    public total_price_incl_tax: number;
    public total_price_incl_tax_base: number;
    public total_discount: number;
    public marked_dubious_on: Date | null;
    public marked_uncollectible_on: Date | null;
    public reminder_count: number;
    public next_reminder: Date | null;
    public original_estimate_id: string | null;
    public url: string;
    public payment_url: string;
    public custom_fields: InvoiceCustomField[];
    public notes: Note[];
    public attachments: Attachment[];
    public events: Event[];

    //public tax_totals: TaxTotals[]

    constructor(public administration: Administration, data: APISalesInvoice) {
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
        this.language = data.language
        this.currency = data.currency;
        this.discount = parseFloat(data.discount)
        this.original_sales_invoice_id = data.original_sales_invoice_id;
        this.paused = data.paused;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.sent_at = data.sent_at ? new Date(data.sent_at) : null;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.public_view_code = data.public_view_code;
        this.public_view_code_expires_at = new Date(data.public_view_code_expires_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(this, d));
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
        this.custom_fields = data.custom_fields.map(n => new InvoiceCustomField(this, n))
        this.payments = data.payments.map(p => new Payment(p));
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async update(options: UpdateSalesInvoiceOptions) {
        const {data} = await this.administration.client.rest.updateDocument<APISalesInvoice>(this, options)
        this.setData(data)
        return this;
    }

    async delete() {
        await this.administration.deleteSalesInvoice(this.id)
    }

    async addNote(options: AddNoteOptions) {
        const {data} = await this.administration.client.rest.addNote(this, options)
        const note = new Note(this, data)
        this.notes.push(note)
        return note;
    }

    async deleteNote(noteId: string) {
        await this.administration.client.rest.deleteNote(this, noteId)
        this.notes = this.notes.filter(n => n.id !== noteId)
    }

    async addAttachment(options: AddAttachmentOptions) {
        return (await this.administration.client.rest.addAttachment(this, options)).data;
    }

    async deleteAttachment(attachmentId: string) {
        await this.administration.client.rest.deleteAttachment(this, attachmentId)
        this.attachments = this.attachments.filter(a => a.id !== attachmentId)
    }

    private setData(data: APISalesInvoice) {
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
        this.language = data.language
        this.currency = data.currency;
        this.discount = parseFloat(data.discount)
        this.original_sales_invoice_id = data.original_sales_invoice_id;
        this.paused = data.paused;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.sent_at = data.sent_at ? new Date(data.sent_at) : null;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.public_view_code = data.public_view_code;
        this.public_view_code_expires_at = new Date(data.public_view_code_expires_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(this, d));
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
        this.custom_fields = data.custom_fields.map(n => new InvoiceCustomField(this, n))
        this.payments = data.payments.map(p => new Payment(p));
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_pdf */
    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_ubl */

    /* todo: https://developer.moneybird.com/api/sales_invoices/#get_sales_invoices_id_download_packing_slip_pdf */

    /**
     * This endpoint provides two options: sending the invoice and scheduling sending in the future. When sending now, you can provide a send method, email address and message. If you don’t provide any arguments, the defaults from the contact and workflow will be used.
     *
     * When scheduling sending, set the boolean sending_scheduled to true and provide an invoice_date.
     */
    async send(options: SendSalesInvoiceOptions = {}) {
        const {data} = await this.administration.client.rest.sendInvoice(this, options);
        this.setData(data);
        return this;
    }

    async registerPaymentCreditInvoice() {
        const {data} = await this.administration.client.rest.registerPaymentCreditInvoice(this);
        this.setData(data);
        return this;
    }

    /* todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_send_reminders */
    /* todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_id_pause */

    /* todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_id_resume */

    /** */
    async duplicateToCreditInvoice() {
        const {data} = await this.administration.client.rest.duplicateToCreditInvoice(this);
        return new SalesInvoice(this.administration, data);
    }

    async addPayment(options: AddPaymentOptions) {
        const {data} = await this.administration.client.rest.addPayment(this, options)
        const payment = new Payment(data)
        this.payments.push(payment)
        return payment;
    }

    async deletePayment(paymentId: string) {
        await this.administration.client.rest.deletePayment(this, paymentId)
        this.payments = this.payments.filter(p => p.id !== paymentId)
    }

    /* todo: Mark dubious/uncollectible
    async markDubious(){
    }

    async markUncollectible(){
    }
    */
}