import {
    AddAttachmentOptions,
    AddNoteOptions,
    APIGeneralDocument,
    UpdateGeneralDocumentOptions
} from "../types";
import {Administration} from "./Administration";
import {Note} from "./Note";
import {Event} from "./Event";
import {Attachment} from "./Attachment";
import {Contact} from "./Contact";

export class GeneralDocument {
    public id: string;
    public administration_id: string;
    public contact_id: string | null;
    public contact: Contact | null;
    public reference: string;
    public date: Date;
    public due_date: Date | null;
    public entry_number: number;
    public state: string;
    public exchange_rate: string;
    public created_at: Date;
    public updated_at: Date;
    public version: number;
    public notes: Note[];
    public attachments: Attachment[];
    public events: Event[];

    constructor(public administration: Administration, data: APIGeneralDocument) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.contact = data.contact ? new Contact(administration, data.contact) : data.contact;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.exchange_rate = data.exchange_rate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async update(options: UpdateGeneralDocumentOptions, removeContact?: boolean) {
        const query = removeContact ? `?remove_contact=true` : "";
        const {data} = await this.administration.client.rest.updateDocument<APIGeneralDocument>(this, options, query)
        this.setData(data)
        return this;
    }

    async delete(refresh_journal_entries?: boolean) {
        await this.administration.deleteGeneralDocument(this.id, refresh_journal_entries)
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

    private setData(data: APIGeneralDocument) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.contact_id = data.contact_id;
        this.contact = data.contact ? new Contact(this.administration, data.contact) : data.contact;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.due_date = data.due_date ? new Date(data.due_date) : null;
        this.entry_number = data.entry_number;
        this.state = data.state;
        this.exchange_rate = data.exchange_rate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }
}