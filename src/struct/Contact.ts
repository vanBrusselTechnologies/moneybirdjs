import {AddNoteOptions, APIContact, ContactPersonOptions, UpdateContactOptions} from "../types";
import {Administration,Note, ContactPerson, CustomField, ContactCustomField, Event} from "../struct";

// noinspection JSUnusedGlobalSymbols
/** */
export class Contact {
    public id: string;
    public administration_id: string;
    public company_name: string;
    public firstname: string;
    public lastname: string;
    public address1: string;
    public address2: string;
    public zipcode: string;
    public city: string;
    public country: string;
    public phone: string;
    public delivery_method: string;
    public customer_id: string;
    public tax_number: string;
    public chamber_of_commerce: string;
    public bank_account: string;
    public attention: string;
    public email: string;
    public email_ubl: boolean;
    public send_invoices_to_attention: string;
    public send_invoices_to_email: string;
    public send_estimates_to_attention: string;
    public send_estimates_to_email: string;
    public sepa_active: boolean;
    public sepa_iban: string;
    public sepa_iban_account_name: string;
    public sepa_bic: string;
    public sepa_mandate_id: string;
    public sepa_mandate_date: string | null;
    public sepa_sequence_type: string;
    public credit_card_number: string;
    public credit_card_reference: string;
    public credit_card_type: null;
    public tax_number_validated_at: Date | null;
    public tax_number_valid: boolean | null;
    public invoice_workflow_id: string | null;
    public estimate_workflow_id: string | null;
    public si_identifier: string;
    public si_identifier_type: string | null;
    public moneybird_payments_mandate: boolean;
    public created_at: Date;
    public updated_at: Date;
    public version: number;
    public sales_invoices_url: string;
    public notes: Note[];
    public custom_fields: CustomField[];
    public contact_people: ContactPerson[];
    public archived: boolean;
    public events: Event[]

    constructor(public administration: Administration, data: APIContact) {
        if (data.credit_card_type) console.log(`Contact.creditCardType: ${data.credit_card_type}`);
        if (data.invoice_workflow_id) console.log(`Contact.invoiceWorkflowId: ${data.invoice_workflow_id}`);
        if (data.estimate_workflow_id) console.log(`Contact.estimateWorkflowId: ${data.estimate_workflow_id}`);

        this.id = data.id;
        this.administration_id = data.administration_id;
        this.company_name = data.company_name;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.address1 = data.address1;
        this.address2 = data.address2;
        this.zipcode = data.zipcode;
        this.city = data.city;
        this.country = data.country;
        this.phone = data.phone;
        this.delivery_method = data.delivery_method;
        this.customer_id = data.customer_id
        this.tax_number = data.tax_number;
        this.chamber_of_commerce = data.chamber_of_commerce;
        this.bank_account = data.bank_account;
        this.attention = data.attention;
        this.email = data.email;
        this.email_ubl = data.email_ubl;
        this.send_invoices_to_attention = data.send_invoices_to_attention;
        this.send_invoices_to_email = data.send_invoices_to_email;
        this.send_estimates_to_attention = data.send_invoices_to_attention;
        this.send_estimates_to_email = data.send_estimates_to_email;
        this.sepa_active = data.sepa_active;
        this.sepa_iban = data.sepa_iban;
        this.sepa_iban_account_name = data.sepa_iban_account_name;
        this.sepa_bic = data.sepa_bic;
        this.sepa_mandate_id = data.sepa_mandate_id;
        this.sepa_mandate_date = data.sepa_mandate_date;
        this.sepa_sequence_type = data.sepa_sequence_type;
        this.credit_card_number = data.credit_card_number;
        this.credit_card_reference = data.credit_card_reference;
        this.credit_card_type = data.credit_card_type;
        this.tax_number_validated_at = data.tax_number_validated_at ? new Date(data.tax_number_validated_at) : null;
        this.tax_number_valid = data.tax_number_valid;
        this.invoice_workflow_id = data.invoice_workflow_id;
        this.estimate_workflow_id = data.estimate_workflow_id;
        this.si_identifier = data.si_identifier;
        this.si_identifier_type = data.si_identifier_type;
        this.moneybird_payments_mandate = data.moneybird_payments_mandate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.sales_invoices_url = data.sales_invoices_url;
        this.notes = data.notes.map(n => new Note(this, n));
        this.custom_fields = data.custom_fields.map(n => new ContactCustomField(this, n))
        this.contact_people = data.contact_people.map(n => new ContactPerson(this, n))
        this.archived = data.archived;
        this.events = data.events ? data.events.map(n => new Event(this, n)) : []
    }

    private setData(data: APIContact) {

        if (data.credit_card_type) console.log(`Contact.creditCardType: ${data.credit_card_type}`);
        if (data.invoice_workflow_id) console.log(`Contact.invoiceWorkflowId: ${data.invoice_workflow_id}`);
        if (data.estimate_workflow_id) console.log(`Contact.estimateWorkflowId: ${data.estimate_workflow_id}`);

        this.id = data.id;
        this.administration_id = data.administration_id;
        this.company_name = data.company_name;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.address1 = data.address1;
        this.address2 = data.address2;
        this.zipcode = data.zipcode;
        this.city = data.city;
        this.country = data.country;
        this.phone = data.phone;
        this.delivery_method = data.delivery_method;
        this.customer_id = data.customer_id
        this.tax_number = data.tax_number;
        this.chamber_of_commerce = data.chamber_of_commerce;
        this.bank_account = data.bank_account;
        this.attention = data.attention;
        this.email = data.email;
        this.email_ubl = data.email_ubl;
        this.send_invoices_to_attention = data.send_invoices_to_attention;
        this.send_invoices_to_email = data.send_invoices_to_email;
        this.send_estimates_to_attention = data.send_invoices_to_attention;
        this.send_estimates_to_email = data.send_estimates_to_email;
        this.sepa_active = data.sepa_active;
        this.sepa_iban = data.sepa_iban;
        this.sepa_iban_account_name = data.sepa_iban_account_name;
        this.sepa_bic = data.sepa_bic;
        this.sepa_mandate_id = data.sepa_mandate_id;
        this.sepa_mandate_date = data.sepa_mandate_date;
        this.sepa_sequence_type = data.sepa_sequence_type;
        this.credit_card_number = data.credit_card_number;
        this.credit_card_reference = data.credit_card_reference;
        this.credit_card_type = data.credit_card_type;
        this.tax_number_validated_at = data.tax_number_validated_at ? new Date(data.tax_number_validated_at) : null;
        this.tax_number_valid = data.tax_number_valid;
        this.invoice_workflow_id = data.invoice_workflow_id;
        this.estimate_workflow_id = data.estimate_workflow_id;
        this.si_identifier = data.si_identifier;
        this.si_identifier_type = data.si_identifier_type;
        this.moneybird_payments_mandate = data.moneybird_payments_mandate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.sales_invoices_url = data.sales_invoices_url;
        this.notes = data.notes.map(n => new Note(this, n));
        this.custom_fields = data.custom_fields.map(n => new ContactCustomField(this, n))
        this.contact_people = data.contact_people.map(n => new ContactPerson(this, n))
        this.archived = data.archived;
        this.events = data.events.map(n => new Event(this, n))
    }

    /** Updates this contact. */
    async update(options: UpdateContactOptions) {
        const {data} = await this.administration.client.rest.updateContact(this, options)
        this.setData(data)
        return this;
    }

    /** Deletes this contact, or archives it when deleting was not possible. */
    async delete() {
        await this.administration.deleteContact(this.id)
    }

    // todo async addAdditionalCharges
    // todo async getAdditionalCharges

    async addNote(options: AddNoteOptions) {
        const {data} = await this.administration.client.rest.addNote(this, options)
        const note = new Note(this, data)
        this.notes.push(note)
        return note;
    }

    async deleteNote(noteId: string) {
        await this.administration.client.rest.deleteNote(this, noteId)
        this.notes = this.notes.filter(n => n.id !== noteId)
    }

    async getContactPerson(contactPersonId: string) {
        const {data} = await this.administration.client.rest.getContactPerson(this, contactPersonId)
        return new ContactPerson(this, data);
    }

    async addContactPerson(options: ContactPersonOptions) {
        const {data} = await this.administration.client.rest.addContactPerson(this, options)
        const contactPerson = new ContactPerson(this, data)
        this.contact_people.push(contactPerson)
        return contactPerson;
    }

    async deleteContactPerson(contactPersonId: string) {
        await this.administration.client.rest.deleteContactPerson(this, contactPersonId)
        this.contact_people = this.contact_people.filter(p => p.id !== contactPersonId)
    }

    // todo async getMoneybirdPaymentsMandate
    // todo async requestNewMoneybirdPaymentsMandate
    // todo async deleteMoneybirdPaymentsMandate
}