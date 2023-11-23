import {AddAttachmentOptions, APITypelessDocument} from "../types";
import {Administration} from "./Administration";
import {Event} from "./Event";
import {Attachment} from "./Attachment";

/**
 * Typeless documents are documents of which the type is not yet known. For example, a document uploaded via email or via the bulk uploader. It is not possible to update a typeless document, except for adding attachments. You will need to set its type first. You cannot set the type of typeless documents using the API yet, but you can do it via the website.
 */
export class TypelessDocument {
    public id: string;
    public administration_id: string;
    public contact_id: string;
    public reference: string;
    public date: Date;
    public state: string;
    public origin: string;
    public created_at: Date;
    public updated_at: Date;
    public version: number;
    public attachments: Attachment[];
    public events: Event[];

    constructor(public administration: Administration, data: APITypelessDocument) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.state = data.state;
        this.origin = data.origin;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async delete(refresh_journal_entries?: boolean) {
        await this.administration.deleteTypelessDocument(this.id, refresh_journal_entries)
    }

    async addAttachment(options: AddAttachmentOptions) {
        return (await this.administration.client.rest.addAttachment(this, options)).data;
    }

    async deleteAttachment(attachmentId: string) {
        await this.administration.client.rest.deleteAttachment(this, attachmentId)
        this.attachments = this.attachments.filter(a => a.id !== attachmentId)
    }
}