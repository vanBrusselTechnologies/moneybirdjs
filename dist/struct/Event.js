"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(entity, data) {
        this.entity = entity;
        this.administration_id = data.administration_id;
        this.user_id = data.user_id;
        this.action = data.action;
        this.link_entity_id = data.link_entity_id;
        this.link_entity_type = data.link_entity_type;
        this.data = data.data;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}
exports.Event = Event;
