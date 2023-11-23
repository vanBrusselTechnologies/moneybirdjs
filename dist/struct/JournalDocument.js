"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalDocument = void 0;
const Note_1 = require("./Note");
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
class JournalDocument {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.journal_type = data.journal_type;
        this.general_journal_document_entries = data.general_journal_document_entries;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
    async update(options, allTaxes) {
        const query = allTaxes ? `?all_taxes=true` : "";
        const { data } = await this.administration.client.rest.updateDocument(this, options, query);
        this.setData(data);
        return this;
    }
    async delete(refresh_journal_entries) {
        await this.administration.deleteJournalDocument(this.id, refresh_journal_entries);
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
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.journal_type = data.journal_type;
        this.general_journal_document_entries = data.general_journal_document_entries;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note_1.Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
}
exports.JournalDocument = JournalDocument;
