"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administration = void 0;
const struct_1 = require("../struct");
// noinspection JSUnusedGlobalSymbols
/** */
class Administration {
    constructor(client, data) {
        this.client = client;
        this.id = data.id;
        this.name = data.name;
        this.language = data.language;
        this.country = data.country;
        this.currency = data.currency;
        this.time_zone = data.time_zone;
        this.access = data.access;
    }
    /**
     * Returns all entities of entityType in the administration. The list contains the id and the version of the entity. Check if the version of the document is newer than the version you have stored locally.
     * @param entityType
     * @param filter
     */
    async listIdsAndVersions(entityType, filter) {
        return (await this.client.rest.synchronize(this, entityType, filter)).data;
    }
    async listContactsByIds(ids) {
        const { data } = await this.client.rest.listContactsByIds(this, ids);
        return data.map((entry) => new struct_1.Contact(this, entry));
    }
    async getContacts(options = {}) {
        const { data } = await this.client.rest.getContacts(this, options);
        return data.map((entry) => new struct_1.Contact(this, entry));
    }
    async getContact(contactId) {
        const { data } = await this.client.rest.getContact(this, contactId);
        return new struct_1.Contact(this, data);
    }
    async getContactByCustomerId(customerId) {
        const { data } = await this.client.rest.getContactByCustomerId(this, customerId);
        return new struct_1.Contact(this, data);
    }
    async addContact(options) {
        const { data } = await this.client.rest.addContact(this, options);
        return new struct_1.Contact(this, data);
    }
    /** Deletes the contact by contactId, or archives it when deleting was not possible. */
    async deleteContact(contactId) {
        await this.client.rest.deleteContact(this, contactId);
    }
    async getCustomFields() {
        const { data } = await this.client.rest.getCustomFields(this);
        return data.map((entry) => new struct_1.CustomField(this, entry));
    }
    async getDocumentStyles() {
        const { data } = await this.client.rest.getDocumentStyles(this);
        return data.map((entry) => new struct_1.DocumentStyle(this, entry));
    }
    async listGeneralDocumentsByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'generalDocument', ids);
        return data.map((entry) => new struct_1.GeneralDocument(this, entry));
    }
    async getGeneralDocuments(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'generalDocument', options);
        return data.map((entry) => new struct_1.GeneralDocument(this, entry));
    }
    async getGeneralDocument(generalDocumentId) {
        const { data } = await this.client.rest.getDocument(this, 'generalDocument', generalDocumentId);
        return new struct_1.GeneralDocument(this, data);
    }
    async addGeneralDocument(options) {
        const { data } = await this.client.rest.addDocument(this, 'generalDocument', options);
        return new struct_1.GeneralDocument(this, data);
    }
    async deleteGeneralDocument(generalDocumentId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'generalDocument', generalDocumentId, refresh_journal_entries);
    }
    async listJournalDocumentsByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'journalDocument', ids);
        return data.map((entry) => new struct_1.JournalDocument(this, entry));
    }
    async getJournalDocuments(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'journalDocument', options);
        return data.map((entry) => new struct_1.JournalDocument(this, entry));
    }
    async getJournalDocument(journalDocumentId) {
        const { data } = await this.client.rest.getDocument(this, 'journalDocument', journalDocumentId);
        return new struct_1.JournalDocument(this, data);
    }
    async addJournalDocument(options) {
        const { data } = await this.client.rest.addDocument(this, 'journalDocument', options);
        return new struct_1.JournalDocument(this, data);
    }
    async deleteJournalDocument(journalDocumentId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'journalDocument', journalDocumentId, refresh_journal_entries);
    }
    async listPurchaseInvoicesByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'purchaseInvoice', ids);
        return data.map((entry) => new struct_1.PurchaseInvoice(this, entry));
    }
    async getPurchaseInvoices(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'purchaseInvoice', options);
        return data.map((entry) => new struct_1.PurchaseInvoice(this, entry));
    }
    async getPurchaseInvoice(purchaseInvoiceId) {
        const { data } = await this.client.rest.getDocument(this, 'purchaseInvoice', purchaseInvoiceId);
        return new struct_1.PurchaseInvoice(this, data);
    }
    async addPurchaseInvoice(options) {
        const { data } = await this.client.rest.addDocument(this, 'purchaseInvoice', options);
        return new struct_1.PurchaseInvoice(this, data);
    }
    async deletePurchaseInvoice(purchaseInvoiceId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'purchaseInvoice', purchaseInvoiceId, refresh_journal_entries);
    }
    async listReceiptsByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'receipt', ids);
        return data.map((entry) => new struct_1.Receipt(this, entry));
    }
    async getReceipts(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'receipt', options);
        return data.map((entry) => new struct_1.Receipt(this, entry));
    }
    async getReceipt(receiptId) {
        const { data } = await this.client.rest.getDocument(this, 'receipt', receiptId);
        return new struct_1.Receipt(this, data);
    }
    async addReceipt(options) {
        const { data } = await this.client.rest.addDocument(this, 'receipt', options);
        return new struct_1.Receipt(this, data);
    }
    async deleteReceipt(receiptId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'receipt', receiptId, refresh_journal_entries);
    }
    async listTypelessDocumentsByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'typelessDocument', ids);
        return data.map((entry) => new struct_1.TypelessDocument(this, entry));
    }
    async getTypelessDocuments(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'typelessDocument', options);
        return data.map((entry) => new struct_1.TypelessDocument(this, entry));
    }
    async getTypelessDocument(typelessDocumentId) {
        const { data } = await this.client.rest.getDocument(this, 'typelessDocument', typelessDocumentId);
        return new struct_1.TypelessDocument(this, data);
    }
    async addTypelessDocument(options) {
        const { data } = await this.client.rest.addDocument(this, 'typelessDocument', options);
        return new struct_1.TypelessDocument(this, data);
    }
    async deleteTypelessDocument(typelessDocumentId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'typelessDocument', typelessDocumentId, refresh_journal_entries);
    }
    //todo: Estimates
    async listExternalSalesInvoicesByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'externalSalesInvoice', ids);
        return data.map((entry) => new struct_1.ExternalSalesInvoice(this, entry));
    }
    async getExternalSalesInvoices(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'externalSalesInvoice', options);
        return data.map((entry) => new struct_1.ExternalSalesInvoice(this, entry));
    }
    async getExternalSalesInvoice(externalSalesInvoiceId) {
        const { data } = await this.client.rest.getDocument(this, 'externalSalesInvoice', externalSalesInvoiceId);
        return new struct_1.ExternalSalesInvoice(this, data);
    }
    async addExternalSalesInvoice(options) {
        const { data } = await this.client.rest.addDocument(this, 'externalSalesInvoice', options);
        return new struct_1.ExternalSalesInvoice(this, data);
    }
    /* todo: https://developer.moneybird.com/api/external_sales_invoices/#post_external_sales_invoices_attachment */
    async deleteExternalSalesInvoice(externalSalesInvoiceId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'externalSalesInvoice', externalSalesInvoiceId, refresh_journal_entries);
    }
    //todo: Financial Accounts
    /** When requesting huge number of mutations, use the Sync API: {@link listIdsAndVersions()} + {@link listFinancialMutationsByIds()} */
    async getFinancialMutations(filter) {
        const { data } = await this.client.rest.getFinancialMutations(this, filter);
        return data.map((entry) => new struct_1.FinancialMutation(this, entry));
    }
    async listFinancialMutationsByIds(ids) {
        const { data } = await this.client.rest.listFinancialMutationsByIds(this, ids);
        return data.map((entry) => new struct_1.FinancialMutation(this, entry));
    }
    /** Returns a single financial mutation in the administration. */
    async getFinancialMutation(financialMutationId) {
        const { data } = await this.client.rest.getFinancialMutation(this, financialMutationId);
        return new struct_1.FinancialMutation(this, data);
    }
    //todo: Financial Statements
    //todo: Identities
    //todo: Ledger Accounts
    async getLedgerAccounts() {
        const { data } = await this.client.rest.getLedgerAccounts(this);
        return data.map((entry) => new struct_1.LedgerAccount(this, entry));
    }
    async getLedgerAccount(ledgerAccountId) {
        const { data } = await this.client.rest.getLedgerAccount(this, ledgerAccountId);
        return new struct_1.LedgerAccount(this, data);
    }
    async addLedgerAccount(options) {
        const { data } = await this.client.rest.addLedgerAccount(this, options);
        return new struct_1.LedgerAccount(this, data);
    }
    async deleteLedgerAccount(ledgerAccountId) {
        await this.client.rest.deleteLedgerAccount(this, ledgerAccountId);
    }
    //todo: Payments
    //todo: Products
    //todo: Projects
    //todo: Purchase transactions
    //todo: Recurring Sales Invoices
    //todo: Sales Invoices
    async listSalesInvoicesByIds(ids) {
        const { data } = await this.client.rest.listDocumentsByIds(this, 'salesInvoice', ids);
        return data.map((entry) => new struct_1.SalesInvoice(this, entry));
    }
    async getSalesInvoices(options = {}) {
        const { data } = await this.client.rest.getDocuments(this, 'salesInvoice', options);
        return data.map((entry) => new struct_1.SalesInvoice(this, entry));
    }
    async getSalesInvoice(salesInvoiceId) {
        const { data } = await this.client.rest.getDocument(this, 'salesInvoice', salesInvoiceId);
        return new struct_1.SalesInvoice(this, data);
    }
    async getSalesInvoiceByInvoiceId(invoiceId) {
        const { data } = await this.client.rest.getSalesInvoiceByInvoiceId(this, invoiceId);
        return new struct_1.SalesInvoice(this, data);
    }
    async getSalesInvoiceByReference(reference) {
        const { data } = await this.client.rest.getSalesInvoiceByReference(this, reference);
        return new struct_1.SalesInvoice(this, data);
    }
    async addSalesInvoice(options) {
        const { data } = await this.client.rest.addDocument(this, 'salesInvoice', options);
        return new struct_1.SalesInvoice(this, data);
    }
    async deleteSalesInvoice(salesInvoiceId, refresh_journal_entries) {
        await this.client.rest.deleteDocument(this, 'salesInvoice', salesInvoiceId, refresh_journal_entries);
    }
    // todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_send_reminders
    //todo: Subscriptions
    /** Returns a paginated list of all available tax rates for the administration */
    async getTaxRates(filter = { tax_rate_type: 'all' }) {
        const { data } = await this.client.rest.getTaxRates(this, filter);
        return data.map((entry) => new struct_1.TaxRate(this, entry));
    }
}
exports.Administration = Administration;
