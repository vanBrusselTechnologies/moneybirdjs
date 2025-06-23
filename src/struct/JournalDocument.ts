import {
    AddAttachmentOptions,
    AddNoteOptions,
    APIJournalDocument,
    APIJournalDocumentEntry,
    UpdateJournalDocumentOptions
} from "../types";
import {Administration, Attachment, Event, Note} from '.'

// noinspection JSUnusedGlobalSymbols
/** */
export class JournalDocument {
    public id: string;
    public administration_id: string;
    public reference: string;
    public date: Date;
    public journal_type: null;
    public general_journal_document_entries: APIJournalDocumentEntry[];
    public created_at: Date;
    public updated_at: Date;
    public version: number;
    public notes: Note[];
    public attachments: Attachment[];
    public events: Event[];

    constructor(public administration: Administration, data: APIJournalDocument) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.journal_type = data.journal_type;
        this.general_journal_document_entries = data.general_journal_document_entries;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }

    async update(options: UpdateJournalDocumentOptions, allTaxes?: boolean) {
        const query = allTaxes ? `?all_taxes=true` : "";
        const {data} = await this.administration.client.rest.updateDocument<APIJournalDocument>(this, options, query)
        this.setData(data)
        return this;
    }

    async delete(refresh_journal_entries?: boolean) {
        await this.administration.deleteJournalDocument(this.id, refresh_journal_entries)
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

    private setData(data: APIJournalDocument) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.reference = data.reference;
        this.date = new Date(data.date);
        this.journal_type = data.journal_type;
        this.general_journal_document_entries = data.general_journal_document_entries;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.notes = data.notes.map(n => new Note(this, n));
        this.attachments = data.attachments.map(a => new Attachment(this, a));
        this.events = data.events.map(e => new Event(this, e));
    }
}