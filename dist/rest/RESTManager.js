"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTManager = void 0;
const RequestHandler_1 = require("./RequestHandler");
const Util_1 = require("../util/Util");
const form_data_1 = __importDefault(require("form-data"));
class RESTManager {
    constructor(apiToken) {
        this.requestHandler = new RequestHandler_1.RequestHandler(apiToken);
    }
    getAdministrations() {
        return this.requestHandler.request('administrations', { method: "GET", body: "{}" });
    }
    addAttachment(doc, options) {
        const form = new form_data_1.default();
        form.append('file', options.attachmentBuffer, { filename: options.attachmentName ?? 'attachment' });
        const docPath = Util_1.Util.entityRestUrl(Util_1.Util.entityToEntityType(doc));
        const att = docPath === 'external_sales_invoices' ? 'attachment' : 'attachments';
        return this.requestHandler.request(`${doc.administration_id}/${docPath}/${doc.id}/${att}`, {
            method: "POST",
            body: form.getBuffer(),
            additionalHeaders: form.getHeaders()
        });
    }
    deleteAttachment(doc, attachmentId) {
        const docPath = Util_1.Util.entityRestUrl(Util_1.Util.entityToEntityType(doc));
        return this.requestHandler.request(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    downloadAttachment(doc, attachmentId) {
        const docPath = Util_1.Util.entityRestUrl(Util_1.Util.entityToEntityType(doc));
        return this.requestHandler.request(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}/download`, {
            method: "GET",
            body: "{}"
        });
    }
    synchronize(administration, entityType, filter) {
        const entityPath = Util_1.Util.entityRestUrl(entityType);
        const query = filter === undefined ? '' : Util_1.Util.queryString({ filter: filter });
        return this.requestHandler.request(`${administration.id}/${entityPath}/synchronization${query}`, { method: "GET", body: "{}" });
    }
    listContactsByIds(administration, ids) {
        return this.requestHandler.request(`${administration.id}/contacts/synchronization`, {
            method: "POST",
            body: JSON.stringify({ ids: ids })
        });
    }
    getContacts(administration, urlOptions) {
        const query = Util_1.Util.queryString(urlOptions);
        return this.requestHandler.request(`${administration.id}/contacts${query}`, {
            method: "GET",
            body: "{}"
        });
    }
    getContact(administration, id) {
        return this.requestHandler.request(`${administration.id}/contacts/${id}`, {
            method: "GET",
            body: "{}"
        });
    }
    getContactByCustomerId(administration, customerId) {
        return this.requestHandler.request(`${administration.id}/contacts/customer_id/${customerId}`, {
            method: "GET",
            body: "{}"
        });
    }
    addContact(administration, options) {
        return this.requestHandler.request(`${administration.id}/contacts`, {
            method: "POST",
            body: JSON.stringify({ contact: options })
        });
    }
    updateContact(contact, options) {
        return this.requestHandler.request(`${contact.administration_id}/contacts/${contact.id}`, {
            method: "PATCH",
            body: JSON.stringify({ contact: options })
        });
    }
    deleteContact(administration, contactId) {
        return this.requestHandler.request(`${administration.id}/contacts/${contactId}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    getContactPerson(contact, contactPersonId) {
        return this.requestHandler.request(`${contact.administration_id}/contacts/${contact.id}/contact_people/${contactPersonId}`, {
            method: "GET",
            body: "{}"
        });
    }
    addContactPerson(contact, options) {
        return this.requestHandler.request(`${contact.administration_id}/contacts/${contact.id}/contact_people`, {
            method: "POST",
            body: JSON.stringify({ contact_person: options })
        });
    }
    updateContactPerson(contactPerson, options) {
        return this.requestHandler.request(`${contactPerson.administration_id}/contacts/${contactPerson.contact.id}/contact_people/${contactPerson.id}`, {
            method: "PATCH",
            body: JSON.stringify({ contact_person: options })
        });
    }
    deleteContactPerson(contact, contactPersonId) {
        return this.requestHandler.request(`${contact.administration.id}/contacts/${contact.id}/contact_people/${contactPersonId}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    getCustomFields(administration) {
        return this.requestHandler.request(`${administration.id}/custom_fields`, {
            method: "GET",
            body: "{}"
        });
    }
    getDocumentStyles(administration) {
        return this.requestHandler.request(`${administration.id}/document_styles`, {
            method: "GET",
            body: "{}"
        });
    }
    //#region Document
    listDocumentsByIds(administration, documentType, ids) {
        const documentPath = Util_1.Util.entityRestUrl(documentType);
        return this.requestHandler.request(`${administration.id}/${documentPath}/synchronization`, {
            method: "POST",
            body: JSON.stringify({ ids: ids })
        });
    }
    getDocuments(administration, documentType, urlOptions) {
        const documentPath = Util_1.Util.entityRestUrl(documentType);
        const query = Util_1.Util.queryString(urlOptions);
        return this.requestHandler.request(`${administration.id}/${documentPath}${query}`, {
            method: "GET",
            body: "{}"
        });
    }
    getDocument(administration, documentType, id) {
        const documentPath = Util_1.Util.entityRestUrl(documentType);
        return this.requestHandler.request(`${administration.id}/${documentPath}/${id}`, {
            method: "GET",
            body: "{}"
        });
    }
    addDocument(administration, documentType, options) {
        const documentPath = Util_1.Util.entityRestUrl(documentType);
        let body = Util_1.Util.entityRequestBody(documentType, options);
        return this.requestHandler.request(`${administration.id}/${documentPath}`, {
            method: "POST",
            body: JSON.stringify(body)
        });
    }
    updateDocument(document, options, query = "") {
        const docType = Util_1.Util.entityToEntityType(document);
        const documentPath = Util_1.Util.entityRestUrl(docType);
        let body = Util_1.Util.entityRequestBody(docType, options);
        return this.requestHandler.request(`${document.administration_id}/${documentPath}/${document.id}${query}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        });
    }
    deleteDocument(administration, documentType, documentId, refresh_journal_entries) {
        const query = refresh_journal_entries ? `?refresh_journal_entries=true` : "";
        const documentPath = Util_1.Util.entityRestUrl(documentType);
        return this.requestHandler.request(`${administration.id}/${documentPath}/${documentId}${query}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    //#endregion Document
    //todo: Payments
    /*
    public addPayment(entity: PurchaseInvoice | Receipt, options: AddPaymentOptions) {
        const entityPath = Util.documentRestUrl(doc)
        return this.requestHandler.request<APIPayment>(`${entity.administration_id}/${entityPath}/${entity.id}/payments`, {
            method: "POST",
            body: JSON.stringify({payment: options})
        })
    }

    public deletePayment(entity: PurchaseInvoice | Receipt, paymentId: string) {
        const entityPath = Util.documentRestUrl(doc)
        return this.requestHandler.request<void>(`${entity.administration_id}/${entityPath}/${entity.id}/payments/${paymentId}`, {
            method: "DELETE",
            body: "{}"
        })
    }
    */
    addNote(entity, options) {
        const entityPath = Util_1.Util.entityRestUrl(Util_1.Util.entityToEntityType(entity));
        return this.requestHandler.request(`${entity.administration_id}/${entityPath}/${entity.id}/notes`, {
            method: "POST",
            body: JSON.stringify({ note: options })
        });
    }
    deleteNote(entity, noteId) {
        const entityPath = Util_1.Util.entityRestUrl(Util_1.Util.entityToEntityType(entity));
        return this.requestHandler.request(`${entity.administration_id}/${entityPath}/${entity.id}/notes/${noteId}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    getFinancialMutations(administration, filter) {
        const query = Util_1.Util.queryString({ filter: filter });
        return this.requestHandler.request(`${administration.id}/financial_mutations${query}`, {
            method: "GET",
            body: "{}"
        });
    }
    listFinancialMutationsByIds(administration, ids) {
        return this.requestHandler.request(`${administration.id}/financial_mutations/synchronization`, {
            method: "POST",
            body: JSON.stringify({ ids: ids })
        });
    }
    getFinancialMutation(administration, id) {
        return this.requestHandler.request(`${administration.id}/financial_mutations/${id}`, {
            method: "GET",
            body: "{}"
        });
    }
    financialMutationLinkBooking(financialMutation, options) {
        return this.requestHandler.request(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/link_booking`, {
            method: "PATCH",
            body: JSON.stringify(options)
        });
    }
    financialMutationUnlinkBooking(financialMutation, options) {
        return this.requestHandler.request(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/unlink_booking`, {
            method: "DELETE",
            body: JSON.stringify(options)
        });
    }
    getTaxRates(administration, filter) {
        const query = Util_1.Util.queryString({ filter: filter });
        return this.requestHandler.request(`${administration.id}/tax_rates${query}`, {
            method: "GET",
            body: "{}"
        });
    }
    getLedgerAccounts(administration) {
        return this.requestHandler.request(`${administration.id}/ledger_accounts`, {
            method: "GET",
            body: "{}"
        });
    }
    getLedgerAccount(administration, id) {
        return this.requestHandler.request(`${administration.id}/ledger_accounts/${id}`, {
            method: "GET",
            body: "{}"
        });
    }
    addLedgerAccount(administration, options) {
        return this.requestHandler.request(`${administration.id}/ledger_accounts`, {
            method: "POST",
            body: JSON.stringify({ ledger_account: options })
        });
    }
    updateLedgerAccount(ledgerAccount, options) {
        return this.requestHandler.request(`${ledgerAccount.administration_id}/ledger_accounts/${ledgerAccount.id}`, {
            method: "PATCH",
            body: JSON.stringify({ ledger_account: options })
        });
    }
    deleteLedgerAccount(administration, ledgerAccountId) {
        return this.requestHandler.request(`${administration.id}/ledger_accounts/${ledgerAccountId}`, {
            method: "DELETE",
            body: "{}"
        });
    }
    getSalesInvoiceByInvoiceId(administration, salesInvoiceId) {
        return this.requestHandler.request(`${administration.id}/sales_invoices/find_by_invoice_id/${salesInvoiceId}`, {
            method: "GET",
            body: "{}"
        });
    }
    getSalesInvoiceByReference(administration, salesInvoiceReference) {
        return this.requestHandler.request(`${administration.id}/sales_invoices/find_by_reference/${salesInvoiceReference}`, {
            method: "GET",
            body: "{}"
        });
    }
}
exports.RESTManager = RESTManager;
