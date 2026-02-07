import {
    AdditionalCharge,
    Administration,
    ContactCustomField,
    ContactPerson,
    CustomField,
    Event,
    Note,
    PaymentsMandate
} from ".";
import {
    AddAdditionalChargeOptions,
    AddContactPersonOptions,
    AddNoteOptions,
    APIContact,
    CreditCardType,
    DeliveryMethod,
    Identifier,
    RequestPaymentsMandateEmailOptions,
    RequestPaymentsMandateOptions,
    SepaSequenceType,
    SiIdentifierType,
    UpdateContactOptions
} from "../types";

/** Contacts are the entities in Moneybird that represent your customers, suppliers, or other business relations. */
export class Contact {
    public id!: Identifier;
    public administration_id!: Identifier;
    public company_name!: string;
    public firstname!: string;
    public lastname!: string;
    public address1!: string;
    public address2!: string;
    public zipcode!: string;
    public city!: string;
    public country!: string;
    public phone!: string;
    public delivery_method!: DeliveryMethod;
    public customer_id!: string;
    public tax_number!: string;
    public chamber_of_commerce!: string;
    public bank_account!: string;
    public is_trusted!: boolean
    public max_transfer_amount?: number
    public attention!: string;
    public email!: string;
    public email_ubl!: boolean;
    public send_invoices_to_attention!: string;
    public send_invoices_to_email!: string;
    public send_estimates_to_attention!: string;
    public send_estimates_to_email!: string;
    public sepa_active!: boolean;
    public sepa_iban!: string;
    public sepa_iban_account_name!: string;
    public sepa_bic!: string;
    public sepa_mandate_id!: string;
    public sepa_mandate_date?: Date;
    public sepa_sequence_type!: SepaSequenceType;
    public credit_card_number!: string;
    public credit_card_reference!: string;
    public credit_card_type?: CreditCardType;
    public tax_number_validated_at?: Date;
    public tax_number_valid?: boolean;
    public invoice_workflow_id?: Identifier;
    public estimate_workflow_id?: Identifier;
    public si_identifier?: string;
    public si_identifier_type?: SiIdentifierType;
    public moneybird_payments_mandate!: boolean;
    public created_at!: Date;
    public updated_at!: Date;
    public version!: number;
    public sales_invoices_url!: string;
    public notes!: Note[];
    public custom_fields!: CustomField[];
    public contact_people!: ContactPerson[];
    public archived!: boolean;
    public events!: Event[];

    constructor(public administration: Administration, data: APIContact) {
        this.setData(data)
    }

    /**
     * Returns all information about a contact person.
     * @see https://developer.moneybird.com/api/contacts#get-contact-person
     */
    async getContactPerson(contactPersonId: Identifier) {
        const {data} = await this.administration.client.rest.getContactPerson(this, contactPersonId)
        return new ContactPerson(this, data);
    }

    /**
     * Deletes a contact person.
     * @see https://developer.moneybird.com/api/contacts#delete-a-contact-person
     */
    async deleteContactPerson(contactPersonId: Identifier) {
        await this.administration.client.rest.deleteContactPerson(this, contactPersonId)
        this.contact_people = this.contact_people.filter(p => p.id !== contactPersonId)
    }

    /**
     * Creating a new contact person in the administration requires at least a `contact_person` hash including `firstname` and `lastname`.
     * @see https://developer.moneybird.com/api/contacts#create-a-new-contact-person
     */
    async addContactPerson(options: AddContactPersonOptions) {
        const {data} = await this.administration.client.rest.addContactPerson(this, options)
        const contactPerson = new ContactPerson(this, data)
        this.contact_people.push(contactPerson)
        return contactPerson;
    }

    /**
     * Obtains a URL for setting up a Moneybird Payments mandate. You must provide this URL to your contact to set up the mandate. Your contact is required to make a 15-cent payment. Every generated URL using this endpoint is valid for 14 days after creation. Only available when Moneybird Payments is enabled for the administration.
     * @see https://developer.moneybird.com/api/contacts#request-an-url-for-setting-up-a-moneybird-payments-mandate
     */
    async requestMoneybirdPaymentsMandateSettingUpURL(options: RequestPaymentsMandateOptions) {
        const {data} = await this.administration.client.rest.requestMoneybirdPaymentsMandateSettingUpURL(this, options)
        return data.url;
    }

    /**
     * Returns information about the stored Moneybird Payments mandate. Only available when Moneybird Payments is enabled for the administration.
     * @see https://developer.moneybird.com/api/contacts#get-moneybird-payments-mandate
     */
    async getMoneybirdPaymentsMandate() {
        const {data} = await this.administration.client.rest.getMoneybirdPaymentsMandate(this)
        return new PaymentsMandate(data);
    }

    /**
     * Sends a request for a Moneybird Payments mandate to a contact via e-mail. Your contact will receive an email containing a link to authorize direct debit payments through Moneybird Payments. Your contact is required to make a 15-cent payment. Only available when Moneybird Payments is enabled for the administration.
     * @see https://developer.moneybird.com/api/contacts#request-a-new-moneybird-payments-mandate
     */
    async requestNewMoneybirdPaymentsMandate(options: RequestPaymentsMandateEmailOptions) {
        await this.administration.client.rest.requestNewMoneybirdPaymentsMandate(this, options)
    }

    /**
     * Deletes the stored Moneybird Payments mandate for the contact. Only available when Moneybird Payments is enabled for the administration.
     * @see https://developer.moneybird.com/api/contacts#delete-a-stored-moneybird-payments-mandate
     */
    async deleteMoneybirdPaymentsMandate(options: RequestPaymentsMandateEmailOptions) {
        await this.administration.client.rest.requestNewMoneybirdPaymentsMandate(this, options)
    }

    /**
     * Deletes a note from the contact.
     * @see https://developer.moneybird.com/api/contacts#destroys-note-from-entity
     */
    async deleteNote(noteId: string) {
        await this.administration.client.rest.deleteNote(this, noteId)
        this.notes = this.notes.filter(n => n.id !== noteId)
    }

    /**
     * Adds a note to the contact.
     * @see https://developer.moneybird.com/api/contacts#adds-note-to-entity
     */
    async addNote(options: AddNoteOptions) {
        const {data} = await this.administration.client.rest.addNote(this, options)
        const note = new Note(this, data)
        this.notes.push(note)
        return note;
    }

    /**
     * Get the additional charges of the given contact.
     * @see https://developer.moneybird.com/api/contacts#get-additional-charges
     * @param include_billed If true, includes the additional charges that have already been billed. Default is false.
     */
    async getAdditionalCharges(include_billed?: boolean) {
        const {data} = await this.administration.client.rest.getAdditionalCharges(this, include_billed)
        return data.map(c => new AdditionalCharge(c))
    }

    /**
     * At the end of the current period, the additional charges for a contact are merged where possible and an invoice will be created for them. The invoice will be scheduled for sending at the first day of the next month.
     * @see https://developer.moneybird.com/api/contacts#create-an-additional-charge-to-be-invoiced-at-start-of-next-period
     */
    async addAdditionalCharge(options: AddAdditionalChargeOptions) {
        const {data} = await this.administration.client.rest.addAdditionalCharge(this, options)
        return new AdditionalCharge(data)
    }

    /**
     * Archives a contact.
     * @see https://developer.moneybird.com/api/contacts#archive-a-contact
     */
    async archive() {
        await this.administration.client.rest.archiveContact(this)
    }

    /**
     * Deletes this contact.
     * @see https://developer.moneybird.com/api/contacts#delete-a-contact
     */
    async delete() {
        await this.administration.deleteContact(this.id)
    }

    /**
     * When updating a contact, you only need to provide the information you want to change. Attributes you don't provide in the request will not be updated. Optional attributes can be removed by setting them to an empty string value.
     * @see https://developer.moneybird.com/api/contacts#update-a-contact
     */
    async update(options: UpdateContactOptions) {
        const {data} = await this.administration.client.rest.updateContact(this, options)
        this.setData(data)
        return this;
    }

    private setData(data: APIContact) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.company_name = data.company_name;
        this.firstname = data.firstname ?? "";
        this.lastname = data.lastname ?? "";
        this.address1 = data.address1 ?? "";
        this.address2 = data.address2 ?? "";
        this.zipcode = data.zipcode ?? "";
        this.city = data.city ?? "";
        this.country = data.country;
        this.phone = data.phone ?? "";
        this.delivery_method = data.delivery_method;
        this.customer_id = data.customer_id
        this.tax_number = data.tax_number ?? "";
        this.chamber_of_commerce = data.chamber_of_commerce ?? "";
        this.bank_account = data.bank_account ?? "";
        this.is_trusted = data.is_trusted;
        if (data.max_transfer_amount != null) this.max_transfer_amount = data.max_transfer_amount;
        this.attention = data.attention ?? "";
        this.email = data.email ?? "";
        this.email_ubl = data.email_ubl;
        this.send_invoices_to_attention = data.send_invoices_to_attention ?? "";
        this.send_invoices_to_email = data.send_invoices_to_email ?? "";
        this.send_estimates_to_attention = data.send_invoices_to_attention ?? "";
        this.send_estimates_to_email = data.send_estimates_to_email ?? "";
        this.sepa_active = data.sepa_active ?? false;
        this.sepa_iban = data.sepa_iban ?? "";
        this.sepa_iban_account_name = data.sepa_iban_account_name ?? "";
        this.sepa_bic = data.sepa_bic ?? "";
        this.sepa_mandate_id = data.sepa_mandate_id ?? "";
        if (data.sepa_mandate_date) this.sepa_mandate_date = new Date(data.sepa_mandate_date);
        this.sepa_sequence_type = data.sepa_sequence_type;
        this.credit_card_number = data.credit_card_number ?? "";
        this.credit_card_reference = data.credit_card_reference ?? "";
        if (data.credit_card_type) this.credit_card_type = data.credit_card_type;
        if (data.tax_number_validated_at) this.tax_number_validated_at = new Date(data.tax_number_validated_at);
        if (data.tax_number_valid != null) this.tax_number_valid = data.tax_number_valid;
        if (data.invoice_workflow_id) this.invoice_workflow_id = data.invoice_workflow_id;
        if (data.estimate_workflow_id) this.estimate_workflow_id = data.estimate_workflow_id;
        if (data.si_identifier) this.si_identifier = data.si_identifier;
        if (data.si_identifier_type) this.si_identifier_type = data.si_identifier_type;
        this.moneybird_payments_mandate = data.moneybird_payments_mandate;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.version = data.version;
        this.sales_invoices_url = data.sales_invoices_url;
        this.notes = data.notes.map(n => new Note(this, n));
        this.custom_fields = data.custom_fields.map(n => new ContactCustomField(this, n))
        this.contact_people = data.contact_people.map(n => new ContactPerson(this, n))
        this.archived = data.archived;
        this.events = (data.events ?? []).map(e => new Event(e))
    }
}