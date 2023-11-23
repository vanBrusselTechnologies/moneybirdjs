"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Attachment = void 0;
class Attachment {
    constructor(entity, data) {
        this.entity = entity;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.attachable_id = data.attachable_id;
        this.attachable_type = data.attachable_type;
        this.filename = data.filename;
        this.content_type = data.content_type;
        this.size = data.size;
        this.rotation = data.rotation;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
    /** Deletes this attachment and removes it from the entity */
    async delete() {
        await this.entity.administration.client.rest.deleteAttachment(this.entity, this.id);
    }
}
exports.Attachment = Attachment;
