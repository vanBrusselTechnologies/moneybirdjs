import { APINote, Document } from "../types";
import { Contact } from "./Contact";
export declare class Note {
    entity: Contact | Document;
    id: string;
    administration_id: string;
    entity_id: string;
    entity_type: string | "Contact";
    user_id: string;
    assignee_id: string;
    todo: boolean;
    note: string;
    completed_at?: Date;
    completed_by_id: null | string;
    todo_type: null | string;
    data: {};
    created_at: Date;
    updated_at: Date;
    constructor(entity: Contact | Document, data: APINote);
    /** Deletes this contact, or archives it when deleting was not possible. */
    delete(): Promise<void>;
}
