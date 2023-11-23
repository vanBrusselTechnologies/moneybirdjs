import { APIAttachment, Document } from "../types";
export declare class Attachment {
    entity: Document;
    id: string;
    administration_id: string;
    attachable_id: string;
    attachable_type: string;
    filename: string;
    content_type: string;
    size: number;
    rotation: number;
    created_at: Date;
    updated_at: Date;
    constructor(entity: Document, data: APIAttachment);
    /** Deletes this attachment and removes it from the entity */
    delete(): Promise<void>;
}
