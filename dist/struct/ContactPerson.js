"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactPerson = void 0;
class ContactPerson {
    constructor(contact, data) {
        this.contact = contact;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
        this.email = data.email;
        this.department = data.department;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
    }
    setData(data) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.phone = data.phone;
        this.email = data.email;
        this.department = data.department;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
    }
    async update(options) {
        const { data } = await this.contact.administration.client.rest.updateContactPerson(this, options);
        this.setData(data);
        return this;
    }
    async delete() {
        await this.contact.deleteContactPerson(this.id);
    }
}
exports.ContactPerson = ContactPerson;
