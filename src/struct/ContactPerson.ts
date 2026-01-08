import {Contact} from ".";
import {APIContactPerson, ContactPersonOptions} from "../types";

export class ContactPerson {
    public id: string;
    public administration_id: string;
    public firstname: string;
    public lastname: string;
    public phone: null | string;
    public email: null | string;
    public department: null | string;
    public created_at: Date;
    public updated_at: Date;
    public version: number;

    constructor(public contact: Contact, data: APIContactPerson) {
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

    private setData(data: APIContactPerson) {
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

    async update(options: ContactPersonOptions) {
        const {data} = await this.contact.administration.client.rest.updateContactPerson(this, options)
        this.setData(data)
        return this;
    }

    async delete() {
        await this.contact.deleteContactPerson(this.id)
    }
}