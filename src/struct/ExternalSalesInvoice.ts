import {Administration, Attachment, DocumentDetail, Event, Note, Payment} from "."
import {
    AddAttachmentOptions,
    AddNoteOptions,
    AddPaymentOptions,
    APIExternalSalesInvoice,
    UpdateExternalSalesInvoiceOptions
} from "../types";

export class ExternalSalesInvoice {
    public id: string;
    public administration_id: string;
    public contact_id: string | null;
    public date: Date;
    public state: "new" | "open" | "late" | "paid";
    public due_date: Date | null;
    public reference: string;
    public entry_number: number;
    public origin: string | null;
    public source: string;
    public source_url: string;
    public currency: string;
    public paid_at: Date | null;
    public created_at: Date;
    public updated_at: Date;
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
    public marked_dubious_on: Date | null;
    public marked_uncollectible_on: Date | null;
    public notes: Note[];
    public attachments: Attachment[];
    public events: Event[];

    //todo public tax_totals: TaxTotals[];

    constructor(public administration: Administration, data: APIExternalSalesInvoice) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.marked_dubious_on = data.marked_dubious_on ? new Date(data.marked_dubious_on) : null;
        this.marked_uncollectible_on = data.marked_uncollectible_on ? new Date(data.marked_uncollectible_on) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.currency = data.currency;
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.origin = data.origin;
        this.source = data.source;
        this.source_url = data.source_url;
        this.total_paid = parseFloat(data.total_paid);
        this.total_unpaid = parseFloat(data.total_unpaid);
        this.total_unpaid_base = parseFloat(data.total_unpaid_base);
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(d));
        this.payments = data.payments.map(p => new Payment(p))
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(e));
    }

    async update(options: UpdateExternalSalesInvoiceOptions) {
        const {data} = await this.administration.client.rest.updateDocument<APIExternalSalesInvoice>(this, options)
        this.setData(data)
        return this;
    }

    async delete() {
        await this.administration.deleteExternalSalesInvoice(this.id)
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

    private setData(data: APIExternalSalesInvoice) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.marked_dubious_on = data.marked_dubious_on ? new Date(data.marked_dubious_on) : null;
        this.marked_uncollectible_on = data.marked_uncollectible_on ? new Date(data.marked_uncollectible_on) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.currency = data.currency;
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.origin = data.origin;
        this.source = data.source;
        this.source_url = data.source_url;
        this.total_paid = parseFloat(data.total_paid);
        this.total_unpaid = parseFloat(data.total_unpaid);
        this.total_unpaid_base = parseFloat(data.total_unpaid_base);
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(d));
        this.payments = data.payments.map(p => new Payment(p))
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(e));
    }

    /* todo: Mark dubious/uncollectible
    async markDubious(){
    }

    async markUncollectible(){
    }
    */
}