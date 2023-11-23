"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralDocument = void 0;
const Note_1 = require("./Note");
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
const Contact_1 = require("./Contact");
class GeneralDocument {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.contact = data.contact ? new Contact_1.Contact(administration, data.contact) : data.contact;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.exchange_rate = data.exchange_rate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
    async update(options, removeContact) {
        const query = removeContact ? `?remove_contact=true` : "";
        const { data } = await this.administration.client.rest.updateDocument(this, options, query);
        this.setData(data);
        return this;
    }
    async delete(refresh_journal_entries) {
        await this.administration.deleteGeneralDocument(this.id, refresh_journal_entries);
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
        this.contact = data.contact ? new Contact_1.Contact(this.administration, data.contact) : data.contact;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.exchange_rate = data.exchange_rate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
}
exports.GeneralDocument = GeneralDocument;
