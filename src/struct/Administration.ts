import {Client} from "../client/Client";
import {
    AssetsReport,
    BalanceSheetReport,
    CashFlowReport,
    Contact,
    CreditorsReport,
    CustomField,
    DebtorsAgingReport,
    DebtorsReport,
    DocumentStyle,
    Download,
    ExpensesByContactReport,
    ExpensesByProjectReport,
    ExternalSalesInvoice,
    FinancialAccount,
    FinancialMutation,
    GeneralDocument,
    GeneralLedgerReport,
    JournalDocument,
    JournalEntriesReport,
    LedgerAccount,
    Payment,
    ProfitLossReport,
    PurchaseInvoice,
    Receipt,
    RevenueByContactReport,
    RevenueByProjectReport,
    SalesInvoice,
    SubscriptionsReport,
    TaxRate,
    TaxReport,
    TypelessDocument,
    User,
    Verifications,
    Workflow
} from ".";
import {
    AddContactOptions,
    AddExternalSalesInvoiceOptions,
    AddGeneralDocumentOptions,
    AddJournalDocumentOptions,
    AddLedgerAccountOptions,
    AddPurchaseInvoiceOptions,
    AddReceiptOptions,
    AddSalesInvoiceOptions,
    AddTypelessDocumentOptions,
    APIAdministration,
    APIExternalSalesInvoice,
    APIGeneralDocument,
    APIJournalDocument,
    APIPurchaseInvoice,
    APIReceipt,
    APISalesInvoice,
    APITypelessDocument,
    CashFlowReportOptions,
    ContactFilterOptions,
    ContactListIdsOptions,
    ContactSearchOptions,
    DownloadFilterOptions,
    EntityType,
    ExternalSalesInvoiceSearchOptions,
    Filter,
    GeneralDocumentSearchOptions,
    Identifier,
    JournalDocumentSearchOptions,
    JournalEntriesReportOptions,
    PagedAgingReportOptions,
    PagedReportOptions,
    ProfitLossReportOptions,
    PurchaseInvoiceSearchOptions,
    ReceiptSearchOptions,
    ReportOptions,
    SalesInvoiceSearchOptions,
    TaxRateSearchOptions,
    TypelessDocumentSearchOptions,
    UserSearchOptions
} from "../types";

/** Administrations are the top level entities in Moneybird. */
export class Administration {
    public id: Identifier;
    public name: string;
    /** The ISO 639-1 language code used in the administration */
    public language: "nl" | "nl-be" | "en";
    /** The ISO 4217 currency code */
    public currency: string;
    /** The ISO 3166-1 alpha-2 code the administration country */
    public country: string;
    /** The time zone of the administration */
    public time_zone: string;
    /** The type of access the user has to this administration */
    public access: string;
    public suspended: boolean;
    public period_locked_until?: Date;

    constructor(public client: Client, data: APIAdministration) {
        this.id = data.id;
        this.name = data.name;
        this.language = data.language;
        this.country = data.country;
        this.currency = data.currency;
        this.time_zone = data.time_zone;
        this.access = data.access;
        this.suspended = data.suspended;
        if (data.period_locked_until) this.period_locked_until = new Date(data.period_locked_until);
    }

    /** Returns all entities of {@link entityType} in the administration. The list contains the id and the version of the entity. Check if the version of the entity is newer than the version you have stored locally. */
    async listIdsAndVersions(entityType: EntityType, filter?: Filter) {
        return (await this.client.rest.synchronize(this, entityType, filter)).data;
    }

    // TODO: Assets

//#region Contacts
    /**
     * Returns all information about a contact by the given customer id
     * @see https://developer.moneybird.com/api/contacts#get-contact-by-customer-id
     */
    async getContactByCustomerId(customerId: string) {
        const {data} = await this.client.rest.getContactByCustomerId(this, customerId)
        return new Contact(this, data)
    }

    /**
     * Returns a paginated list of all contacts in the administration.
     * The {@link ContactFilterOptions.filter} argument allows you to filter the list of contacts.
     * @see https://developer.moneybird.com/api/contacts#filter-contacts
     */
    async filterContacts(options?: ContactFilterOptions) {
        const {data} = await this.client.rest.filterContacts(this, options)
        return data.map((entry) => new Contact(this, entry))
    }

    /**
     * Returns all contacts in the administration. The list contains the contact id and the version of the contact. Check if the version of the contact is newer than the version you have stored locally, use {@link listContactsByIds} for fetching contacts with the given ids.
     * @see https://developer.moneybird.com/api/contacts#list-all-ids-and-versions
     */
    async listContactIdsAndVersions(options?: ContactListIdsOptions) {
        return (await this.client.rest.listContactIdsAndVersions(this, options)).data;
    }

    /**
     * Given a list of contact ids, returns the contact information belonging to the contacts. Returns a maximum of 100 contacts, even if more ids are provided.
     * @see https://developer.moneybird.com/api/contacts#fetch-contacts-with-given-ids
     */
    async listContactsByIds(ids: Array<Identifier>) {
        const {data} = await this.client.rest.getContactsByIds(this, ids)
        return data.map((entry) => new Contact(this, entry))
    }

    /**
     * Returns all information about a contact.
     * @see https://developer.moneybird.com/api/contacts#get-contact
     */
    async getContact(contactId: Identifier, include_archived?: boolean) {
        const {data} = await this.client.rest.getContact(this, contactId, include_archived)
        return new Contact(this, data)
    }

    /**
     * Deletes a contact.
     * @see https://developer.moneybird.com/api/contacts#delete-a-contact
     */
    async deleteContact(contactId: Identifier) {
        await this.client.rest.deleteContact(this, contactId)
    }

    /**
     * Returns a paginated list of contacts in the administration.
     *
     * Searching for contacts can be done by providing the {@link ContactSearchOptions.query} parameter with search terms. The API searches for matches in the following contact fields:
     * - `company_name`
     * - `attention`
     * - `firstname`
     * - `lastname`
     * - `address1`
     * - `address2`
     * - `zipcode`
     * - `city`
     * - `country`
     * - `email`
     * - `phone`
     * - `customer_id`
     * - `tax_number`
     * - `chamber_of_commerce`
     * - `bank_account`
     * @see https://developer.moneybird.com/api/contacts#list-all-contacts
     */
    async getContacts(options?: ContactSearchOptions) {
        const {data} = await this.client.rest.getContacts(this, options)
        return data.map((entry) => new Contact(this, entry))
    }

    /**
     * Creating a new contact in the administration requires at least a `company_name` or a `firstname` and `lastname`.
     * @see https://developer.moneybird.com/api/contacts#create-a-new-contact
     */
    async addContact(options: AddContactOptions) {
        const {data} = await this.client.rest.addContact(this, options)
        return new Contact(this, data)
    }

//#endregion Contacts
//#region Custom Fields
    /**
     * Custom fields are used to add extra information to entities in the administration. The [source]{@link CustomField.source} field defines for which entities the custom field can be used. The id of a custom field is required to add a value for a custom field to an entity.
     * @see https://developer.moneybird.com/api/custom-fields#list-all-custom-fields
     */
    async getCustomFields() {
        const {data} = await this.client.rest.getCustomFields(this)
        return data.map((entry) => new CustomField(entry))
    }

//#endregion Custom Fields

    // TODO: Customer contact portal

//#region Document Styles
    /**
     * Returns a list of all document styles.
     * @see https://developer.moneybird.com/api/document-styles#list-all-document-styles
     */
    async getDocumentStyles() {
        const {data} = await this.client.rest.getDocumentStyles(this)
        return data.map((entry) => new DocumentStyle(this, entry))
    }

//#endregion Document Styles
//#region Downloads
    /**
     * Returns a paginated list of all downloads in the administration.
     *
     * Only downloads that the authenticated user has permission to access will be returned, based on the download type and the user's permissions within the administration.
     * @see https://developer.moneybird.com/api/downloads#list-all-downloads
     */
    async getDownloads(options?: DownloadFilterOptions) {
        const {data} = await this.client.rest.getDownloads(this, options)
        return data.map((entry) => new Download(this, entry))
    }

//#endregion Downloads

    /** */
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

    // TODO: Estimates

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

    /* TODO: https://developer.moneybird.com/api/external_sales_invoices/#post_external_sales_invoices_attachment */

    async deleteExternalSalesInvoice(externalSalesInvoiceId: string, refresh_journal_entries?: boolean) {
        await this.client.rest.deleteDocument(this, 'externalSalesInvoice', externalSalesInvoiceId, refresh_journal_entries)
    }

    /** Retrieve all available financial accounts for the administration */
    async getFinancialAccounts() {
        const {data} = await this.client.rest.getFinancialAccounts(this)
        return data.map((entry) => new FinancialAccount(this, entry))
    }

    /** When requesting huge number of mutations, use the Sync API: {@link listIdsAndVersions} + {@link listFinancialMutationsByIds} */
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

    // TODO: Financial Statements
    // TODO: Identities

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

    async getPayment(paymentId: string) {
        const {data} = await this.client.rest.getPayment(this, paymentId)
        return new Payment(data)
    }

    // TODO: Products
    // TODO: Projects
    // TODO: Purchase transactions
    // TODO: Recurring Sales Invoices
//#region Reports
    /**
     * Get the assets report for the administration.
     * @see https://developer.moneybird.com/api/reports#assets-report
     */
    async getAssetsReport(options?: ReportOptions) {
        const {data} = await this.client.rest.getAssetsReport(this, options)
        return new AssetsReport(data)
    }

    /**
     * Get the balance sheet report for the administration showing the financial position at the end of the specified period.
     * @see https://developer.moneybird.com/api/reports#balance-sheet-report
     */
    async getBalanceSheetReport(options?: ReportOptions) {
        const {data} = await this.client.rest.getBalanceSheetReport(this, options)
        return new BalanceSheetReport(data)
    }

    /**
     * Get the cash flow report for the administration showing cash received and cash paid during the specified period.
     * @see https://developer.moneybird.com/api/reports#cash-flow-report
     */
    async getCashFlowReport(options?: CashFlowReportOptions) {
        const {data} = await this.client.rest.getCashFlowReport(this, options)
        return new CashFlowReport(data)
    }

    /**
     * Returns a creditors report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#creditors-report
     */
    async getCreditorsReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getCreditorsReport(this, options)
        return new CreditorsReport(data)
    }

    /**
     * Returns a debtors report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#debtors-report
     */
    async getDebtorsReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getDebtorsReport(this, options)
        return new DebtorsReport(data)
    }

    /**
     * Returns a debtors aging report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#debtors-aging-report
     */
    async getDebtorsAgingReport(options?: PagedAgingReportOptions) {
        const {data} = await this.client.rest.getDebtorsAgingReport(this, options)
        return new DebtorsAgingReport(data)
    }

    /**
     * Returns an expenses-by-contact report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#expenses-by-contact-report
     */
    async getExpensesByContactReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getExpensesByContactReport(this, options)
        return new ExpensesByContactReport(data)
    }

    /**
     * Returns an expenses-by-project report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#expenses-by-project-report
     */
    async getExpensesByProjectReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getExpensesByProjectReport(this, options)
        return new ExpensesByProjectReport(data)
    }

    /**
     * Queue the export of an auditfile (XAF XML format) for the specified year. The auditfile will be added to your [downloads]{@link https://developer.moneybird.com/api/downloads} when ready.
     * The administration must not have any ledger accounts with missing or duplicate account IDs, and the specified year must contain journal entries.
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/auditfile#export-auditfile
     */
    async exportAuditfile(year: number) {
        await this.client.rest.exportAuditfile(this, year)
    }

    /**
     * Queue the export of a brugstaat XML file for the specified year. The file will be added to your [downloads]{@link https://developer.moneybird.com/api/downloads} when ready.
     * All ledger accounts must have valid RGS taxonomy codes assigned.
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/brugstaat#export-brugstaat
     */
    async exportBrugstaat(year: number) {
        await this.client.rest.exportBrugstaat(this, year)
    }

    /**
     * Queue the export of ledger accounts (grootboekkaarten) to an Excel file for the specified year. This file contains all bookings and can be used for manual audits. The file will be added to your [downloads]{@link https://developer.moneybird.com/api/downloads} when ready.
     * The specified year must contain journal entries.
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/ledger_accounts#export-ledger-accounts
     */
    async exportLedgerAccounts(year: number) {
        await this.client.rest.exportLedgerAccounts(this, year)
    }

    /**
     * Get the general ledger report for the administration showing all ledger accounts with their balances and movements during the specified period.
     * @see https://developer.moneybird.com/api/reports#general-ledger-report
     */
    async getGeneralLedgerReport(options?: ReportOptions) {
        const {data} = await this.client.rest.getGeneralLedgerReport(this, options)
        return new GeneralLedgerReport(data)
    }

    /**
     * Get the journal entries report showing all bookings within the specified period.
     * This endpoint allows filtering by various criteria, including project, contact, ledger account, and account types.
     *
     * **Requirements:**
     * - At least one of project_id, contact_id, or ledger_account_id is required
     * - When account_type is provided, either contact_id or project_id must also be specified
     *
     * **Example Use Cases:**
     * - To get a report for revenue by project detail, use account_type parameter with the value "revenue" and the required project_id
     * - To get a report for revenue by contact detail, use account_type parameter with the value "revenue" and the required contact_id
     * - To get a report for expenses by project detail, make one request for account_type "expenses" and one for "direct_costs", both with the required project_id
     * - To get a report for expenses by contact detail, make one request for account_type "expenses" and one for "direct_costs", both with the required contact_id
     * @see https://developer.moneybird.com/api/reports#journal-entries-report
     */
    async getJournalEntriesReport(options?: JournalEntriesReportOptions) {
        const {data} = await this.client.rest.getJournalEntriesReport(this, options)
        return new JournalEntriesReport(data)
    }

    /**
     * Get the profit loss report for the administration.
     * @see https://developer.moneybird.com/api/reports#profit-loss-report
     */
    async getProfitLossReport(options?: ProfitLossReportOptions) {
        const {data} = await this.client.rest.getProfitLossReport(this, options)
        return new ProfitLossReport(data)
    }

    /**
     * Returns a revenue-by-contact report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#revenue-by-contact-report
     */
    async getRevenueByContactReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getRevenueByContactReport(this, options)
        return new RevenueByContactReport(data)
    }

    /**
     * Returns a revenue-by-project report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#revenue-by-project-report
     */
    async getRevenueByProjectReport(options?: PagedReportOptions) {
        const {data} = await this.client.rest.getRevenueByProjectReport(this, options)
        return new RevenueByProjectReport(data)
    }

    /**
     * Get the subscriptions report for the administration.
     * @see https://developer.moneybird.com/api/reports#subscriptions-report
     */
    async getSubscriptionsReport(options?: ReportOptions) {
        const {data} = await this.client.rest.getSubscriptionsReport(this, options)
        return new SubscriptionsReport(data)
    }

    /**
     * Get the tax report for the administration.
     * @see https://developer.moneybird.com/api/reports#tax-report
     */
    async getTaxReport(options?: ReportOptions) {
        const {data} = await this.client.rest.getTaxReport(this, options)
        return new TaxReport(data)
    }

//#endregion Reports
    /** */
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

    // TODO: Subscription templates
    // TODO: Subscriptions

    /** Returns a paginated list of all available tax rates for the administration */
    async getTaxRates(filter: TaxRateSearchOptions = {tax_rate_type: 'all'}) {
        const {data} = await this.client.rest.getTaxRates(this, filter)
        return data.map((entry) => new TaxRate(entry))
    }

    // TODO: Time entries

    /** Returns a list of users within the administration. */
    async getUsers(options: UserSearchOptions = {}) {
        const {data} = await this.client.rest.getUsers(this, options)
        return data.map((entry) => new User(entry))
    }

    /**
     * Retrieve all the verifications within an administration. Returns all verified e-mail addresses and bank account numbers, as well as the verified chamber of commerce number and tax number.
     * @see https://developer.moneybird.com/api/verifications#retrieve-verifications
     */
    async getVerifications() {
        const {data} = await this.client.rest.getVerifications(this)
        return new Verifications(data)
    }

    // TODO: Webhooks

    /**
     * Returns a list of all the workflows of an administration.
     * @see https://developer.moneybird.com/api/workflows#retrieve-available-workflows
     */
    async getWorkflows() {
        const {data} = await this.client.rest.getWorkflows(this)
        return data.map((entry) => new Workflow(entry))
    }
}