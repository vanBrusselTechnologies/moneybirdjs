import * as Constants from "../util/Constants";
import {RequestHandler} from "./RequestHandler";
import {
    AddAttachmentOptions,
    AddContactOptions,
    AddLedgerAccountOptions,
    AddNoteOptions, AddPaymentOptions,
    APIAdministration,
    APIContact,
    APIContactPerson,
    APICustomField,
    APIDocument,
    APIDocumentStyle, APIFinancialAccount,
    APIFinancialMutation,
    APILedgerAccount,
    APINote, APIPayment,
    APISalesInvoice,
    APITaxRate, APIUser, APIVerifications, APIWorkflow,
    ContactPersonOptions,
    ContactSearchOptions,
    Document,
    DocumentAddOptions,
    DocumentEntityType,
    DocumentSearchOptions,
    DocumentUpdateOptions,
    EntityType, ExternalSalesInvoice,
    Filter,
    FinancialMutationLinkBookingOptions,
    FinancialMutationUnlinkBookingOptions, SendSalesInvoiceOptions,
    TaxRateSearchOptions,
    UpdateContactOptions,
    UpdateLedgerAccountOptions, UserSearchOptions
} from "../types";
import {Util} from "../util/Util";
import {
    Administration,
    Contact,
    ContactPerson,
    FinancialMutation,
    SalesInvoice,
    PurchaseInvoice,
    Receipt
} from "../struct";
import FormData from 'form-data';
import {LedgerAccount} from "../struct";

export class RESTManager {
    requestHandler: RequestHandler

    constructor(apiToken: string) {
        this.requestHandler = new RequestHandler(apiToken)
    }

    public getAdministrations() {
        return this.requestHandler.request<APIAdministration[]>(`administrations.${Constants.format}`, {method: "GET", body: "{}"})
    }

    public addAttachment(doc: Document, options: AddAttachmentOptions) {
        const form = new FormData();
        form.append('file', options.attachmentBuffer, {filename: options.attachmentName ?? 'attachment'});
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        const att = docPath === 'external_sales_invoices' ? 'attachment' : 'attachments'
        return this.requestHandler.request<void>(`${doc.administration_id}/${docPath}/${doc.id}/${att}.${Constants.format}`, {
            method: "POST",
            body: form.getBuffer(),
            additionalHeaders: form.getHeaders()
        })
    }

    public deleteAttachment(doc: Document, attachmentId: string) {
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        return this.requestHandler.request<void>(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public downloadAttachment(doc: Document, attachmentId: string) {
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        return this.requestHandler.request<Buffer>(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}/download.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public synchronize(administration: Administration, entityType: EntityType, filter?: Filter) {
        const entityPath = Util.entityRestUrl(entityType);
        const query = filter === undefined ? '' : Util.queryString({filter: filter});
        return this.requestHandler.request<{
            id: string,
            version: number
        }[]>(`${administration.id}/${entityPath}/synchronization.${Constants.format}${query}`, {method: "GET", body: "{}"})
    }

    public listContactsByIds(administration: Administration, ids: Array<string>) {
        return this.requestHandler.request<APIContact[]>(`${administration.id}/contacts/synchronization.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getContacts(administration: Administration, urlOptions: ContactSearchOptions) {
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<APIContact[]>(`${administration.id}/contacts.${Constants.format}${query}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getContact(administration: Administration, id: string) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts/${id}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getContactByCustomerId(administration: Administration, customerId: string) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts/customer_id/${customerId}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public addContact(administration: Administration, options: AddContactOptions) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({contact: options})
        })
    }

    public updateContact(contact: Contact, options: UpdateContactOptions) {
        return this.requestHandler.request<APIContact>(`${contact.administration_id}/contacts/${contact.id}.${Constants.format}`, {
            method: "PATCH",
            body: JSON.stringify({contact: options})
        })
    }

    public deleteContact(administration: Administration, contactId: string) {
        return this.requestHandler.request<void>(`${administration.id}/contacts/${contactId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getContactPerson(contact: Contact, contactPersonId: string) {
        return this.requestHandler.request<APIContactPerson>(`${contact.administration_id}/contacts/${contact.id}/contact_people/${contactPersonId}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public addContactPerson(contact: Contact, options: ContactPersonOptions) {
        return this.requestHandler.request<APIContactPerson>(`${contact.administration_id}/contacts/${contact.id}/contact_people.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({contact_person: options})
        })
    }

    public updateContactPerson(contactPerson: ContactPerson, options: ContactPersonOptions) {
        return this.requestHandler.request<APIContactPerson>(`${contactPerson.administration_id}/contacts/${contactPerson.contact.id}/contact_people/${contactPerson.id}.${Constants.format}`, {
            method: "PATCH",
            body: JSON.stringify({contact_person: options})
        })
    }

    public deleteContactPerson(contact: Contact, contactPersonId: string) {
        return this.requestHandler.request<void>(`${contact.administration.id}/contacts/${contact.id}/contact_people/${contactPersonId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getCustomFields(administration: Administration) {
        return this.requestHandler.request<APICustomField[]>(`${administration.id}/custom_fields.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getDocumentStyles(administration: Administration) {
        return this.requestHandler.request<APIDocumentStyle[]>(`${administration.id}/document_styles.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

//#region Document

    public listDocumentsByIds<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, ids: Array<string>) {
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<T[]>(`${administration.id}/${documentPath}/synchronization.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getDocuments<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, urlOptions: DocumentSearchOptions) {
        const documentPath = Util.entityRestUrl(documentType);
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<T[]>(`${administration.id}/${documentPath}.${Constants.format}${query}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getDocument<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, id: string) {
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<T>(`${administration.id}/${documentPath}/${id}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public addDocument<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, options: DocumentAddOptions) {
        const documentPath = Util.entityRestUrl(documentType);
        let body = Util.entityRequestBody(documentType, options);
        return this.requestHandler.request<T>(`${administration.id}/${documentPath}.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }

    public updateDocument<T extends APIDocument>(document: Document, options: DocumentUpdateOptions, query: string = "") {

        const docType = Util.entityToEntityType(document);
        const documentPath = Util.entityRestUrl(docType);
        let body = Util.entityRequestBody(docType, options);
        return this.requestHandler.request<T>(`${document.administration_id}/${documentPath}/${document.id}.${Constants.format}${query}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        })
    }

    public deleteDocument(administration: Administration, documentType: DocumentEntityType, documentId: string, refresh_journal_entries?: boolean) {
        const query = refresh_journal_entries ? `?refresh_journal_entries=true` : "";
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<void>(`${administration.id}/${documentPath}/${documentId}.${Constants.format}${query}`, {
            method: "DELETE",
            body: "{}"
        })
    }

//#endregion Document
    public addPayment(entity: ExternalSalesInvoice | PurchaseInvoice | Receipt | SalesInvoice, options: AddPaymentOptions) {
        const docType = Util.entityToEntityType(entity);
        const documentPath = Util.entityRestUrl(docType);
        return this.requestHandler.request<APIPayment>(`${entity.administration_id}/${documentPath}/${entity.id}/payments.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({payment: options})
        })
    }

    public deletePayment(entity: ExternalSalesInvoice | PurchaseInvoice | Receipt | SalesInvoice, paymentId: string) {
        const docType = Util.entityToEntityType(entity);
        const documentPath = Util.entityRestUrl(docType);
        return this.requestHandler.request<void>(`${entity.administration_id}/${documentPath}/${entity.id}/payments/${paymentId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public addNote(entity: Contact | Document, options: AddNoteOptions) {
        const entityPath = Util.entityRestUrl(Util.entityToEntityType(entity));
        return this.requestHandler.request<APINote>(`${entity.administration_id}/${entityPath}/${entity.id}/notes.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({note: options})
        })
    }

    public deleteNote(entity: Contact | Document, noteId: string) {
        const entityPath = Util.entityRestUrl(Util.entityToEntityType(entity));
        return this.requestHandler.request<void>(`${entity.administration_id}/${entityPath}/${entity.id}/notes/${noteId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getFinancialAccounts(administration: Administration) {
        return this.requestHandler.request<APIFinancialAccount[]>(`${administration.id}/financial_accounts.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getFinancialMutations(administration: Administration, filter: Filter) {
        const query = Util.queryString({filter: filter});
        return this.requestHandler.request<APIFinancialMutation[]>(`${administration.id}/financial_mutations.${Constants.format}${query}`, {
            method: "GET",
            body: "{}"
        })
    }

    public listFinancialMutationsByIds(administration: Administration, ids: Array<string>) {
        return this.requestHandler.request<APIFinancialMutation[]>(`${administration.id}/financial_mutations/synchronization.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getFinancialMutation(administration: Administration, id: string) {
        return this.requestHandler.request<APIFinancialMutation>(`${administration.id}/financial_mutations/${id}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public financialMutationLinkBooking(financialMutation: FinancialMutation, options: FinancialMutationLinkBookingOptions) {
        return this.requestHandler.request<void>(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/link_booking.${Constants.format}`, {
            method: "PATCH",
            body: JSON.stringify(options)
        })
    }

    public financialMutationUnlinkBooking(financialMutation: FinancialMutation, options: FinancialMutationUnlinkBookingOptions) {
        return this.requestHandler.request<void>(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/unlink_booking.${Constants.format}`, {
            method: "DELETE",
            body: JSON.stringify(options)
        })
    }

    public getTaxRates(administration: Administration, filter: TaxRateSearchOptions) {
        const query = Util.queryString({filter: filter as Filter});
        return this.requestHandler.request<APITaxRate[]>(`${administration.id}/tax_rates.${Constants.format}${query}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getLedgerAccounts(administration: Administration) {
        return this.requestHandler.request<APILedgerAccount[]>(`${administration.id}/ledger_accounts.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getLedgerAccount(administration: Administration, id: string) {
        return this.requestHandler.request<APILedgerAccount>(`${administration.id}/ledger_accounts/${id}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public addLedgerAccount(administration: Administration, options: AddLedgerAccountOptions, rgs_code: string) {
        return this.requestHandler.request<APILedgerAccount>(`${administration.id}/ledger_accounts.${Constants.format}`, {
            method: "POST",
            body: JSON.stringify({ledger_account: options, rgs_code: rgs_code})
        })
    }

    public updateLedgerAccount(ledgerAccount: LedgerAccount, options: UpdateLedgerAccountOptions, rgs_code: string) {
        return this.requestHandler.request<APILedgerAccount>(`${ledgerAccount.administration_id}/ledger_accounts/${ledgerAccount.id}.${Constants.format}`, {
            method: "PATCH",
            body: JSON.stringify({ledger_account: options, rgs_code: rgs_code})
        })
    }

    public deleteLedgerAccount(administration: Administration, ledgerAccountId: string) {
        return this.requestHandler.request<void>(`${administration.id}/ledger_accounts/${ledgerAccountId}.${Constants.format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getSalesInvoiceByInvoiceId(administration: Administration, salesInvoiceId: string) {
        return this.requestHandler.request<APISalesInvoice>(`${administration.id}/sales_invoices/find_by_invoice_id/${salesInvoiceId}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getSalesInvoiceByReference(administration: Administration, salesInvoiceReference: string) {
        return this.requestHandler.request<APISalesInvoice>(`${administration.id}/sales_invoices/find_by_reference/${salesInvoiceReference}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public sendInvoice(invoice: SalesInvoice, options: SendSalesInvoiceOptions) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/send_invoice.${Constants.format}`, {
            method: "PATCH",
            body: JSON.stringify({sales_invoice_sending: options})
        })
    }

    public registerPaymentCreditInvoice(invoice: SalesInvoice) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/register_payment_creditinvoice.${Constants.format}`, {
            method: "PATCH",
            body: "{}"
        })
    }

    public duplicateToCreditInvoice(invoice: SalesInvoice) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/duplicate_creditinvoice.${Constants.format}`, {
            method: "PATCH",
            body: "{}"
        })
    }

    public getPayment(administration: Administration, id: string) {
        return this.requestHandler.request<APIPayment>(`${administration.id}/payments/${id}.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getUsers(administration: Administration, urlOptions: UserSearchOptions) {
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<APIUser[]>(`${administration.id}/users.${Constants.format}${query}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getVerifications(administration: Administration) {
        return this.requestHandler.request<APIVerifications>(`${administration.id}/verifications.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }

    public getWorkflows(administration: Administration) {
        return this.requestHandler.request<APIWorkflow[]>(`${administration.id}/workflows.${Constants.format}`, {
            method: "GET",
            body: "{}"
        })
    }
}