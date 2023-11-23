import { AddAttachmentOptions, AddNoteOptions, APIJournalDocument, APIJournalDocumentEntry, UpdateJournalDocumentOptions } from "../types";
import { Administration } from "./Administration";
import { Note } from "./Note";
import { Event } from "./Event";
import { Attachment } from "./Attachment";
export declare class JournalDocument {
    administration: Administration;
    id: string;
    administration_id: string;
    reference: string;
    date: Date;
    journal_type: null;
    general_journal_document_entries: APIJournalDocumentEntry[];
    created_at: Date;
    updated_at: Date;
    version: number;
    notes: Note[];
    attachments: Attachment[];
    events: Event[];
    constructor(administration: Administration, data: APIJournalDocument);
    update(options: UpdateJournalDocumentOptions, allTaxes?: boolean): Promise<this>;
    delete(refresh_journal_entries?: boolean): Promise<void>;
    addNote(options: AddNoteOptions): Promise<Note>;
    deleteNote(noteId: string): Promise<void>;
    addAttachment(options: AddAttachmentOptions): Promise<void>;
    deleteAttachment(attachmentId: string): Promise<void>;
    private setData;
}
