"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Receipt = void 0;
const Note_1 = require("./Note");
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
const DocumentDetail_1 = require("./DocumentDetail");
const Payment_1 = require("./Payment");
class Receipt {
    constructor(administration, data) {
        this.administration = administration;
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
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
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
    async delete(refresh_journal_entries) {
        await this.administration.deleteReceipt(this.id, refresh_journal_entries);
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
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
        this.payments = data.payments.map(p => new Payment_1.Payment(this, p));
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
}
exports.Receipt = Receipt;
