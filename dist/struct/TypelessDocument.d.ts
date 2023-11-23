import { AddAttachmentOptions, APITypelessDocument } from "../types";
import { Administration } from "./Administration";
import { Event } from "./Event";
import { Attachment } from "./Attachment";
/**
 * Typeless documents are documents of which the type is not yet known. For example, a document uploaded via email or via the bulk uploader. It is not possible to update a typeless document, except for adding attachments. You will need to set its type first. You cannot set the type of typeless documents using the API yet, but you can do it via the website.
 */
export declare class TypelessDocument {
    administration: Administration;
    id: string;
    administration_id: string;
    contact_id: string;
    reference: string;
    date: Date;
    state: string;
    origin: string;
    created_at: Date;
    updated_at: Date;
    version: number;
    attachments: Attachment[];
    events: Event[];
    constructor(administration: Administration, data: APITypelessDocument);
    delete(refresh_journal_entries?: boolean): Promise<void>;
    addAttachment(options: AddAttachmentOptions): Promise<void>;
    deleteAttachment(attachmentId: string): Promise<void>;
}
