"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypelessDocument = void 0;
const Event_1 = require("./Event");
const Attachment_1 = require("./Attachment");
/**
 * Typeless documents are documents of which the type is not yet known. For example, a document uploaded via email or via the bulk uploader. It is not possible to update a typeless document, except for adding attachments. You will need to set its type first. You cannot set the type of typeless documents using the API yet, but you can do it via the website.
 */
class TypelessDocument {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.state = data.state;
        this.origin = data.origin;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.attachments = data.attachments.map(a => new Attachment_1.Attachment(this, a));
        this.events = data.events.map(e => new Event_1.Event(this, e));
    }
    async delete(refresh_journal_entries) {
        await this.administration.deleteTypelessDocument(this.id, refresh_journal_entries);
    }
    async addAttachment(options) {
        return (await this.administration.client.rest.addAttachment(this, options)).data;
    }
    async deleteAttachment(attachmentId) {
        await this.administration.client.rest.deleteAttachment(this, attachmentId);
        this.attachments = this.attachments.filter(a => a.id !== attachmentId);
    }
}
exports.TypelessDocument = TypelessDocument;
