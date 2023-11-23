import {APINote, Document} from "../types";
import {Contact} from "./Contact";

export class Note {
    public id: string;
    public administration_id: string;
    public entity_id: string;
    public entity_type: string | "Contact";
    public user_id: string;
    public assignee_id: string;
    public todo: boolean;
    public note: string;
    public completed_at?: Date;
    public completed_by_id: null | string;
    public todo_type: null | string;
    public data: {};
    public created_at: Date;
    public updated_at: Date;

    constructor(public entity: Contact | Document, data: APINote) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.entity_id = data.entity_id;
        this.entity_type = data.entity_type;
        this.user_id = data.user_id;
        this.assignee_id = data.assignee_id;
        this.todo = data.todo;
        this.note = data.note;
        if (data.completed_at) this.completed_at = new Date(data.completed_at)
        this.completed_by_id = data.completed_by_id;
        this.todo_type = data.todo_type;
        this.data = data.data;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    /** Deletes this contact, or archives it when deleting was not possible. */
    async delete() {
        await this.entity.administration.client.rest.deleteNote(this.entity, this.id)
    }
}