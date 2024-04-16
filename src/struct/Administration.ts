import {
    AddContactOptions,
    AddExternalSalesInvoiceOptions,
    AddGeneralDocumentOptions,
    AddJournalDocumentOptions, AddLedgerAccountOptions,
    AddPurchaseInvoiceOptions,
    AddReceiptOptions, AddSalesInvoiceOptions,
    AddTypelessDocumentOptions,
    APIAdministration,
    APIExternalSalesInvoice,
    APIGeneralDocument,
    APIJournalDocument,
    APIPurchaseInvoice,
    APIReceipt, APISalesInvoice,
    APITypelessDocument,
    ContactSearchOptions,
    EntityType,
    ExternalSalesInvoiceSearchOptions,
    Filter,
    GeneralDocumentSearchOptions,
    JournalDocumentSearchOptions,
    PurchaseInvoiceSearchOptions,
    ReceiptSearchOptions, SalesInvoiceSearchOptions,
    TaxRateSearchOptions,
    TypelessDocumentSearchOptions
} from "../types";
import {Client} from "../client/Client";
import {
    Contact,
    CustomField,
    DocumentStyle,
    ExternalSalesInvoice,
    GeneralDocument,
    JournalDocument,
    PurchaseInvoice,
    Receipt,
    SalesInvoice,
    TaxRate,
    TypelessDocument,
    FinancialMutation,
    LedgerAccount
} from "../struct";

// noinspection JSUnusedGlobalSymbols
/** */
export class Administration {
    public id: string;
    public name: string;
    public language: string;
    public currency: string;
    public country: string;
    public time_zone: string;
    public access: string;

    constructor(public client: Client, data: APIAdministration) {
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
    async listIdsAndVersions(entityType: EntityType, filter?: Filter) {
        return (await this.client.rest.synchronize(this, entityType, filter)).data;
    }

    async listContactsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listContactsByIds(this, ids)
        return data.map((entry) => new Contact(this, entry))
    }

    async getContacts(options: ContactSearchOptions = {}) {
        const {data} = await this.client.rest.getContacts(this, options)
        return data.map((entry) => new Contact(this, entry))
    }

    async getContact(contactId: string) {
        const {data} = await this.client.rest.getContact(this, contactId)
        return new Contact(this, data)
    }

    async getContactByCustomerId(customerId: string) {
        const {data} = await this.client.rest.getContactByCustomerId(this, customerId)
        return new Contact(this, data)
    }

    async addContact(options: AddContactOptions) {
        const {data} = await this.client.rest.addContact(this, options)
        return new Contact(this, data)
    }

    /** Deletes the contact by contactId, or archives it when deleting was not possible. */
    async deleteContact(contactId: string) {
        await this.client.rest.deleteContact(this, contactId)
    }

    async getCustomFields() {
        const {data} = await this.client.rest.getCustomFields(this)
        return data.map((entry) => new CustomField(this, entry))
    }

    async getDocumentStyles() {
        const {data} = await this.client.rest.getDocumentStyles(this)
        return data.map((entry) => new DocumentStyle(this, entry))
    }

    async listGeneralDocumentsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APIGeneralDocument>(this, 'generalDocument', ids);
        return data.map((entry) => new GeneralDocument(this, entry))
    }

    async getGeneralDocuments(options: GeneralDocumentSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APIGeneralDocument>(this, 'generalDocument', options)
        return data.map((entry) => new GeneralDocument(this, entry))
    }

    async getGeneralDocument(generalDocumentId: string) {
        const {data} = await this.client.rest.getDocument<APIGeneralDocument>(this, 'generalDocument', generalDocumentId)
        return new GeneralDocument(this, data)
    }

    async addGeneralDocument(options: AddGeneralDocumentOptions) {
        const {data} = await this.client.rest.addDocument<APIGeneralDocument>(this, 'generalDocument', options)
        return new GeneralDocument(this, data)
    }

    async deleteGeneralDocument(generalDocumentId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'generalDocument', generalDocumentId, refresh_journal_entries)
    }

    async listJournalDocumentsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APIJournalDocument>(this, 'journalDocument', ids);
        return data.map((entry) => new JournalDocument(this, entry))
    }

    async getJournalDocuments(options: JournalDocumentSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APIJournalDocument>(this, 'journalDocument', options)
        return data.map((entry) => new JournalDocument(this, entry))
    }

    async getJournalDocument(journalDocumentId: string) {
        const {data} = await this.client.rest.getDocument<APIJournalDocument>(this, 'journalDocument', journalDocumentId)
        return new JournalDocument(this, data)
    }

    async addJournalDocument(options: AddJournalDocumentOptions) {
        const {data} = await this.client.rest.addDocument<APIJournalDocument>(this, 'journalDocument', options)
        return new JournalDocument(this, data)
    }

    async deleteJournalDocument(journalDocumentId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'journalDocument', journalDocumentId, refresh_journal_entries)
    }

    async listPurchaseInvoicesByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APIPurchaseInvoice>(this, 'purchaseInvoice', ids);
        return data.map((entry) => new PurchaseInvoice(this, entry))
    }

    async getPurchaseInvoices(options: PurchaseInvoiceSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APIPurchaseInvoice>(this, 'purchaseInvoice', options)
        return data.map((entry) => new PurchaseInvoice(this, entry))
    }

    async getPurchaseInvoice(purchaseInvoiceId: string) {
        const {data} = await this.client.rest.getDocument<APIPurchaseInvoice>(this, 'purchaseInvoice', purchaseInvoiceId)
        return new PurchaseInvoice(this, data)
    }

    async addPurchaseInvoice(options: AddPurchaseInvoiceOptions) {
        const {data} = await this.client.rest.addDocument<APIPurchaseInvoice>(this, 'purchaseInvoice', options)
        return new PurchaseInvoice(this, data)
    }

    async deletePurchaseInvoice(purchaseInvoiceId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'purchaseInvoice', purchaseInvoiceId, refresh_journal_entries)
    }

    async listReceiptsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APIReceipt>(this, 'receipt', ids);
        return data.map((entry) => new Receipt(this, entry))
    }

    async getReceipts(options: ReceiptSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APIReceipt>(this, 'receipt', options)
        return data.map((entry) => new Receipt(this, entry))
    }

    async getReceipt(receiptId: string) {
        const {data} = await this.client.rest.getDocument<APIReceipt>(this, 'receipt', receiptId)
        return new Receipt(this, data)
    }

    async addReceipt(options: AddReceiptOptions) {
        const {data} = await this.client.rest.addDocument<APIReceipt>(this, 'receipt', options)
        return new Receipt(this, data)
    }

    async deleteReceipt(receiptId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'receipt', receiptId, refresh_journal_entries)
    }

    async listTypelessDocumentsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APITypelessDocument>(this, 'typelessDocument', ids);
        return data.map((entry) => new TypelessDocument(this, entry))
    }

    async getTypelessDocuments(options: TypelessDocumentSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APITypelessDocument>(this, 'typelessDocument', options)
        return data.map((entry) => new TypelessDocument(this, entry))
    }

    async getTypelessDocument(typelessDocumentId: string) {
        const {data} = await this.client.rest.getDocument<APITypelessDocument>(this, 'typelessDocument', typelessDocumentId)
        return new TypelessDocument(this, data)
    }

    async addTypelessDocument(options: AddTypelessDocumentOptions) {
        const {data} = await this.client.rest.addDocument<APIPurchaseInvoice>(this, 'typelessDocument', options)
        return new TypelessDocument(this, data)
    }

    async deleteTypelessDocument(typelessDocumentId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'typelessDocument', typelessDocumentId, refresh_journal_entries)
    }

    //todo: Estimates

    async listExternalSalesInvoicesByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APIExternalSalesInvoice>(this, 'externalSalesInvoice', ids);
        return data.map((entry) => new ExternalSalesInvoice(this, entry))
    }

    async getExternalSalesInvoices(options: ExternalSalesInvoiceSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APIExternalSalesInvoice>(this, 'externalSalesInvoice', options)
        return data.map((entry) => new ExternalSalesInvoice(this, entry))
    }

    async getExternalSalesInvoice(externalSalesInvoiceId: string) {
        const {data} = await this.client.rest.getDocument<APIExternalSalesInvoice>(this, 'externalSalesInvoice', externalSalesInvoiceId)
        return new ExternalSalesInvoice(this, data)
    }

    async addExternalSalesInvoice(options: AddExternalSalesInvoiceOptions) {
        const {data} = await this.client.rest.addDocument<APIExternalSalesInvoice>(this, 'externalSalesInvoice', options)
        return new ExternalSalesInvoice(this, data)
    }

    /* todo: https://developer.moneybird.com/api/external_sales_invoices/#post_external_sales_invoices_attachment */

    async deleteExternalSalesInvoice(externalSalesInvoiceId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'externalSalesInvoice', externalSalesInvoiceId, refresh_journal_entries)
    }

    //todo: Financial Accounts

    /** When requesting huge number of mutations, use the Sync API: {@link listIdsAndVersions()} + {@link listFinancialMutationsByIds()} */
    async getFinancialMutations(filter: Filter) {
        const {data} = await this.client.rest.getFinancialMutations(this, filter)
        return data.map((entry) => new FinancialMutation(this, entry))
    }

    async listFinancialMutationsByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listFinancialMutationsByIds(this, ids);
        return data.map((entry) => new FinancialMutation(this, entry))
    }

    /** Returns a single financial mutation in the administration. */
    async getFinancialMutation(financialMutationId: string) {
        const {data} = await this.client.rest.getFinancialMutation(this, financialMutationId)
        return new FinancialMutation(this, data)
    }

    //todo: Financial Statements
    //todo: Identities

    //todo: Ledger Accounts
    async getLedgerAccounts() {
        const {data} = await this.client.rest.getLedgerAccounts(this)
        return data.map((entry) => new LedgerAccount(this, entry))
    }

    async getLedgerAccount(ledgerAccountId: string) {
        const {data} = await this.client.rest.getLedgerAccount(this, ledgerAccountId)
        return new LedgerAccount(this, data)
    }

    /**
     * @param options
     * @param rgs_code Existing RGS version 3.5 code, e.g. ‘WMfoBelMfo’
     */
    async addLedgerAccount(options: AddLedgerAccountOptions, rgs_code: string) {
        const {data} = await this.client.rest.addLedgerAccount(this, options, rgs_code)
        return new LedgerAccount(this, data)
    }

    async deleteLedgerAccount(ledgerAccountId: string) {
        await this.client.rest.deleteLedgerAccount(this, ledgerAccountId)
    }

    //todo: Payments
    //todo: Products
    //todo: Projects
    //todo: Purchase transactions
    //todo: Recurring Sales Invoices
    //todo: Sales Invoices

    async listSalesInvoicesByIds(ids: Array<string>) {
        const {data} = await this.client.rest.listDocumentsByIds<APISalesInvoice>(this, 'salesInvoice', ids);
        return data.map((entry) => new SalesInvoice(this, entry))
    }

    async getSalesInvoices(options: SalesInvoiceSearchOptions = {}) {
        const {data} = await this.client.rest.getDocuments<APISalesInvoice>(this, 'salesInvoice', options)
        return data.map((entry) => new SalesInvoice(this, entry))
    }

    async getSalesInvoice(salesInvoiceId: string) {
        const {data} = await this.client.rest.getDocument<APISalesInvoice>(this, 'salesInvoice', salesInvoiceId)
        return new SalesInvoice(this, data)
    }

    async getSalesInvoiceByInvoiceId(invoiceId: string) {
        const {data} = await this.client.rest.getSalesInvoiceByInvoiceId(this, invoiceId)
        return new SalesInvoice(this, data)
    }

    async getSalesInvoiceByReference(reference: string) {
        const {data} = await this.client.rest.getSalesInvoiceByReference(this, reference)
        return new SalesInvoice(this, data)
    }

    async addSalesInvoice(options: AddSalesInvoiceOptions) {
        const {data} = await this.client.rest.addDocument<APISalesInvoice>(this, 'salesInvoice', options)
        return new SalesInvoice(this, data)
    }

    async deleteSalesInvoice(salesInvoiceId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'salesInvoice', salesInvoiceId, refresh_journal_entries)
    }

    // todo: https://developer.moneybird.com/api/sales_invoices/#post_sales_invoices_send_reminders

    //todo: Subscriptions

    /** Returns a paginated list of all available tax rates for the administration */
    async getTaxRates(filter: TaxRateSearchOptions = {tax_rate_type: 'all'}) {
        const {data} = await this.client.rest.getTaxRates(this, filter)
        return data.map((entry) => new TaxRate(this, entry))
    }

    //todo: Time entries
    //todo: Users
    //todo: Verifications
    //todo: Webhooks
    //todo: Workflows
}