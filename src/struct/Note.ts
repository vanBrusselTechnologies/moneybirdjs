import {Contact} from ".";
import {APINote, Document, Identifier, NoteEntityType, ToDoType} from "../types";

export class Note {
    public id: Identifier;
    public administration_id: Identifier;
    public entity_id?: Identifier;
    public entity_type: NoteEntityType;
    public user_id: Identifier;
    public assignee_id?: Identifier;
    public todo: boolean;
    public note: string;
    public completed_at?: Date;
    public completed_by_id?: Identifier;
    public todo_type?: ToDoType;
    public data: { [key: string]: string };
    public created_at: Date;
    public updated_at: Date;

    constructor(public entity: Contact | Document, data: APINote) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        if (data.entity_id) this.entity_id = data.entity_id;
        this.entity_type = data.entity_type;
        this.user_id = data.user_id;
        if (data.assignee_id) this.assignee_id = data.assignee_id;
        this.todo = data.todo;
        this.note = data.note ?? "";
        if (data.completed_at) this.completed_at = new Date(data.completed_at)
        if (data.completed_by_id) this.completed_by_id = data.completed_by_id;
        if (data.todo_type) this.todo_type = data.todo_type;
        this.data = data.data;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    async delete() {
        await this.entity.administration.client.rest.deleteNote(this.entity, this.id)
    }
}