"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalSalesInvoice = void 0;
const Note_1 = require("./Note");
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
const DocumentDetail_1 = require("./DocumentDetail");
// noinspection JSUnusedGlobalSymbols
class ExternalSalesInvoice {
    //public tax_totals: TaxTotals[];
    constructor(administration, data) {
        this.administration = administration;
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
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
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
        this.details = data.details.map(d => new DocumentDetail_1.DocumentDetail(this, d));
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
}
exports.ExternalSalesInvoice = ExternalSalesInvoice;
