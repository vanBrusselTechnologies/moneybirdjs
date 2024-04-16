"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
class Note {
    constructor(entity, data) {
        this.entity = entity;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.entity_id = data.entity_id;
        this.entity_type = data.entity_type;
        this.user_id = data.user_id;
        this.assignee_id = data.assignee_id;
        this.todo = data.todo;
        this.note = data.note;
        if (data.completed_at)
            this.completed_at = new Date(data.completed_at);
        this.completed_by_id = data.completed_by_id;
        this.todo_type = data.todo_type;
        this.data = data.data;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
    async delete() {
        await this.entity.administration.client.rest.deleteNote(this.entity, this.id);
    }
}
exports.Note = Note;
