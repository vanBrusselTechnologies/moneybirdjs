import {AddAttachmentOptions, AddNoteOptions, AddPaymentOptions, APIReceipt, UpdateReceiptOptions} from "../types";
import {Administration} from "./Administration";
import {Note} from "./Note";
import {Event} from "./Event";
import {Attachment} from "./Attachment";
import {DocumentDetail} from "./DocumentDetail";
import {Payment} from "./Payment";

export class Receipt {
    public id: string;
    public administration_id: string;
    public contact_id: string;
    public reference: string;
    public date: Date;
    public due_date: Date | null;
    public entry_number: number;
    public state: string;
    public currency: string;
    public exchange_rate: string;
    public revenue_invoice: boolean;
    public prices_are_incl_tax: boolean;
    public origin: string;
    public paid_at: Date | null;
    public tax_number: string;
    public total_price_excl_tax: number;
    public total_price_excl_tax_base: number;
    public total_price_incl_tax: number;
    public total_price_incl_tax_base: number;
    public created_at: Date;
    public updated_at: Date;
    public version: number;
    public details: DocumentDetail[]
    public payments: Payment[]
    public notes: Note[];
    public attachments: Attachment[];
    public events: Event[];

    constructor(public administration: Administration, data: APIReceipt) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.currency = data.currency;
        this.exchange_rate = data.exchange_rate;
        this.revenue_invoice = data.revenue_invoice;
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.origin = data.origin;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.tax_number = data.tax_number;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(this, d));
        this.payments = data.payments.map(p => new Payment(this, p))
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async update(options: UpdateReceiptOptions) {
        const {data} = await this.administration.client.rest.updateDocument<APIReceipt>(this, options)
        this.setData(data)
        return this;
    }

    async delete(refresh_journal_entries?: boolean) {
        await this.administration.deleteReceipt(this.id, refresh_journal_entries)
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

    private setData(data: APIReceipt) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.currency = data.currency;
        this.exchange_rate = data.exchange_rate;
        this.revenue_invoice = data.revenue_invoice;
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.origin = data.origin;
        this.paid_at = data.paid_at ? new Date(data.paid_at) : null;
        this.tax_number = data.tax_number;
        this.total_price_excl_tax = parseFloat(data.total_price_excl_tax);
        this.total_price_excl_tax_base = parseFloat(data.total_price_excl_tax_base);
        this.total_price_incl_tax = parseFloat(data.total_price_incl_tax);
        this.total_price_incl_tax_base = parseFloat(data.total_price_incl_tax_base);
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.details = data.details.map(d => new DocumentDetail(this, d));
        this.payments = data.payments.map(p => new Payment(this, p))
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async addPayment(options: AddPaymentOptions) {
        const {data} = await this.administration.client.rest.addPayment(this, options)
        const payment = new Payment(this, data)
        this.payments.push(payment)
        return payment;
    }

    async deletePayment(paymentId: string) {
        await this.administration.client.rest.deletePayment(this, paymentId)
        this.payments = this.payments.filter(p => p.id !== paymentId)
    }
}