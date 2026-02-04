import {Contact} from ".";
import {APIContactPerson, Identifier, UpdateContactPersonOptions} from "../types";

export class ContactPerson {
    public id!: Identifier;
    public contact_id!: Identifier;
    public administration_id!: Identifier;
    public firstname!: string;
    public lastname!: string;
    public phone?: string;
    public email?: string;
    public department?: string;
    public created_at!: Date;
    public updated_at!: Date;
    public version!: number;

    constructor(public contact: Contact, data: APIContactPerson) {
        this.setData(data)
    }

    /**
     * Deletes a contact person.
     * @see https://developer.moneybird.com/api/contacts#delete-a-contact-person
     */
    async delete() {
        await this.contact.deleteContactPerson(this.id)
    }

    /**
     * When updating a contact, you only need to provide the information you want to change. Attributes you don't provide in the request will not be updated.
     * @see https://developer.moneybird.com/api/contacts#update-a-contact-person
     */
    async update(options: UpdateContactPersonOptions) {
        const {data} = await this.contact.administration.client.rest.updateContactPerson(this, options)
        this.setData(data)
        return this;
    }

    private setData(data: APIContactPerson) {
        this.id = data.id;
        this.contact_id = data.contact_id;
        this.administration_id = data.administration_id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        if (data.phone) this.phone = data.phone;
        if (data.email) this.email = data.email;
        if (data.department) this.department = data.department;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
    }
}