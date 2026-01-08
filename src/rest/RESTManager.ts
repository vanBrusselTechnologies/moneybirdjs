import {format} from "../util/Constants";
import {RequestHandler} from "./RequestHandler";
import {
    Administration,
    Contact,
    ContactPerson,
    ExternalSalesInvoice,
    FinancialMutation,
    LedgerAccount,
    PurchaseInvoice,
    Receipt,
    SalesInvoice
} from "../struct";
import {
    AddAttachmentOptions,
    AddContactOptions,
    AddLedgerAccountOptions,
    AddNoteOptions,
    AddPaymentOptions,
    APIAdministration,
    APIBalanceSheetReport,
    APICashFlowReport,
    APIContact,
    APIContactPerson,
    APICreditorsReport,
    APICustomField,
    APIDebtorsReport,
    APIDocument,
    APIDocumentStyle,
    APIExpensesByContactReport,
    APIExpensesByProjectReport,
    APIFinancialAccount,
    APIFinancialMutation,
    APIGeneralLedgerReport,
    APILedgerAccount,
    APINote,
    APIPayment,
    APIProfitLossReport,
    APIReportAsset,
    APIReportJournalEntry,
    APIRevenueByContactReport,
    APIRevenueByProjectReport,
    APISalesInvoice,
    APISubscriptionsReport,
    APITaxRate,
    APITaxReport,
    APIUser,
    APIVerifications,
    APIWorkflow,
    CashFlowReportOptions,
    ContactPersonOptions,
    ContactSearchOptions,
    Document,
    DocumentAddOptions,
    DocumentEntityType,
    DocumentSearchOptions,
    DocumentUpdateOptions,
    EntityType,
    Filter,
    FinancialMutationLinkBookingOptions,
    FinancialMutationUnlinkBookingOptions,
    JournalEntriesReportOptions,
    PagedReportOptions,
    ProfitLossReportOptions,
    ReportOptions,
    SendSalesInvoiceOptions,
    TaxRateSearchOptions,
    UpdateContactOptions,
    UpdateLedgerAccountOptions,
    UserSearchOptions
} from "../types";
import {Util} from "../util/Util";
import FormData from "form-data";

export class RESTManager {
    requestHandler: RequestHandler

    constructor(apiToken: string) {
        this.requestHandler = new RequestHandler(apiToken)
    }

    /**
     * Lists all administrations the current user has access to.
     * @see https://developer.moneybird.com/api/administrations#list-all-administrations
     */
    public getAdministrations() {
        return this.requestHandler.request<APIAdministration[]>(`administrations${format}`, {method: "GET"})
    }

//#region Attachment
    /** */
    public addAttachment(doc: Document, options: AddAttachmentOptions) {
        const form = new FormData();
        form.append('file', options.attachmentBuffer, {filename: options.attachmentName ?? 'attachment'});
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        const att = docPath === 'external_sales_invoices' ? 'attachment' : 'attachments'
        return this.requestHandler.request<void>(`${doc.administration_id}/${docPath}/${doc.id}/${att}${format}`, {
            method: "POST",
            body: Util.toArrayBuffer(form.getBuffer()),
            additionalHeaders: form.getHeaders()
        })
    }

    public deleteAttachment(doc: Document, attachmentId: string) {
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        return this.requestHandler.request<void>(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public downloadAttachment(doc: Document, attachmentId: string) {
        const docPath = Util.entityRestUrl(Util.entityToEntityType(doc));
        return this.requestHandler.request<Buffer>(`${doc.administration_id}/${docPath}/${doc.id}/attachments/${attachmentId}/download${format}`, {method: "GET"})
    }

//#endregion Attachment
    /** */
    public synchronize(administration: Administration, entityType: EntityType, filter?: Filter) {
        const entityPath = Util.entityRestUrl(entityType);
        const query = filter === undefined ? '' : Util.queryString({filter: filter});
        return this.requestHandler.request<{
            id: string,
            version: number
        }[]>(`${administration.id}/${entityPath}/synchronization${format}${query}`, {method: "GET"})
    }

    public listContactsByIds(administration: Administration, ids: Array<string>) {
        return this.requestHandler.request<APIContact[]>(`${administration.id}/contacts/synchronization${format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getContacts(administration: Administration, urlOptions: ContactSearchOptions) {
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<APIContact[]>(`${administration.id}/contacts${format}${query}`, {method: "GET"})
    }

    public getContact(administration: Administration, id: string) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts/${id}${format}`, {method: "GET"})
    }

    public getContactByCustomerId(administration: Administration, customerId: string) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts/customer_id/${customerId}${format}`, {method: "GET"})
    }

    public addContact(administration: Administration, options: AddContactOptions) {
        return this.requestHandler.request<APIContact>(`${administration.id}/contacts${format}`, {
            method: "POST",
            body: JSON.stringify({contact: options})
        })
    }

    public updateContact(contact: Contact, options: UpdateContactOptions) {
        return this.requestHandler.request<APIContact>(`${contact.administration_id}/contacts/${contact.id}${format}`, {
            method: "PATCH",
            body: JSON.stringify({contact: options})
        })
    }

    public deleteContact(administration: Administration, contactId: string) {
        return this.requestHandler.request<void>(`${administration.id}/contacts/${contactId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getContactPerson(contact: Contact, contactPersonId: string) {
        return this.requestHandler.request<APIContactPerson>(`${contact.administration_id}/contacts/${contact.id}/contact_people/${contactPersonId}${format}`, {method: "GET"})
    }

    public addContactPerson(contact: Contact, options: ContactPersonOptions) {
        return this.requestHandler.request<APIContactPerson>(`${contact.administration_id}/contacts/${contact.id}/contact_people${format}`, {
            method: "POST",
            body: JSON.stringify({contact_person: options})
        })
    }

    public updateContactPerson(contactPerson: ContactPerson, options: ContactPersonOptions) {
        return this.requestHandler.request<APIContactPerson>(`${contactPerson.administration_id}/contacts/${contactPerson.contact.id}/contact_people/${contactPerson.id}${format}`, {
            method: "PATCH",
            body: JSON.stringify({contact_person: options})
        })
    }

    public deleteContactPerson(contact: Contact, contactPersonId: string) {
        return this.requestHandler.request<void>(`${contact.administration.id}/contacts/${contact.id}/contact_people/${contactPersonId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getCustomFields(administration: Administration) {
        return this.requestHandler.request<APICustomField[]>(`${administration.id}/custom_fields${format}`, {method: "GET"})
    }

    public getDocumentStyles(administration: Administration) {
        return this.requestHandler.request<APIDocumentStyle[]>(`${administration.id}/document_styles${format}`, {method: "GET"})
    }

//#region Document
    /** */
    public listDocumentsByIds<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, ids: Array<string>) {
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<T[]>(`${administration.id}/${documentPath}/synchronization${format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getDocuments<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, urlOptions: DocumentSearchOptions) {
        const documentPath = Util.entityRestUrl(documentType);
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<T[]>(`${administration.id}/${documentPath}${format}${query}`, {method: "GET"})
    }

    public getDocument<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, id: string) {
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<T>(`${administration.id}/${documentPath}/${id}${format}`, {method: "GET"})
    }

    public addDocument<T extends APIDocument>(administration: Administration, documentType: DocumentEntityType, options: DocumentAddOptions) {
        const documentPath = Util.entityRestUrl(documentType);
        let body = Util.entityRequestBody(documentType, options);
        return this.requestHandler.request<T>(`${administration.id}/${documentPath}${format}`, {
            method: "POST",
            body: JSON.stringify(body)
        })
    }

    public updateDocument<T extends APIDocument>(document: Document, options: DocumentUpdateOptions, query: string = "") {
        const docType = Util.entityToEntityType(document);
        const documentPath = Util.entityRestUrl(docType);
        let body = Util.entityRequestBody(docType, options);
        return this.requestHandler.request<T>(`${document.administration_id}/${documentPath}/${document.id}${format}${query}`, {
            method: "PATCH",
            body: JSON.stringify(body)
        })
    }

    public deleteDocument(administration: Administration, documentType: DocumentEntityType, documentId: string, refresh_journal_entries?: boolean) {
        const query = refresh_journal_entries ? `?refresh_journal_entries=true` : "";
        const documentPath = Util.entityRestUrl(documentType);
        return this.requestHandler.request<void>(`${administration.id}/${documentPath}/${documentId}${format}${query}`, {
            method: "DELETE",
            body: "{}"
        })
    }

//#endregion Document
    /** */
    public addPayment(entity: ExternalSalesInvoice | PurchaseInvoice | Receipt | SalesInvoice, options: AddPaymentOptions) {
        const docType = Util.entityToEntityType(entity);
        const documentPath = Util.entityRestUrl(docType);
        return this.requestHandler.request<APIPayment>(`${entity.administration_id}/${documentPath}/${entity.id}/payments${format}`, {
            method: "POST",
            body: JSON.stringify({payment: options})
        })
    }

    public deletePayment(entity: ExternalSalesInvoice | PurchaseInvoice | Receipt | SalesInvoice, paymentId: string) {
        const docType = Util.entityToEntityType(entity);
        const documentPath = Util.entityRestUrl(docType);
        return this.requestHandler.request<void>(`${entity.administration_id}/${documentPath}/${entity.id}/payments/${paymentId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public addNote(entity: Contact | Document, options: AddNoteOptions) {
        const entityPath = Util.entityRestUrl(Util.entityToEntityType(entity));
        return this.requestHandler.request<APINote>(`${entity.administration_id}/${entityPath}/${entity.id}/notes${format}`, {
            method: "POST",
            body: JSON.stringify({note: options})
        })
    }

    public deleteNote(entity: Contact | Document, noteId: string) {
        const entityPath = Util.entityRestUrl(Util.entityToEntityType(entity));
        return this.requestHandler.request<void>(`${entity.administration_id}/${entityPath}/${entity.id}/notes/${noteId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    public getFinancialAccounts(administration: Administration) {
        return this.requestHandler.request<APIFinancialAccount[]>(`${administration.id}/financial_accounts${format}`, {method: "GET"})
    }

    public getFinancialMutations(administration: Administration, filter: Filter) {
        const query = Util.queryString({filter: filter});
        return this.requestHandler.request<APIFinancialMutation[]>(`${administration.id}/financial_mutations${format}${query}`, {method: "GET"})
    }

    public listFinancialMutationsByIds(administration: Administration, ids: Array<string>) {
        return this.requestHandler.request<APIFinancialMutation[]>(`${administration.id}/financial_mutations/synchronization${format}`, {
            method: "POST",
            body: JSON.stringify({ids: ids})
        })
    }

    public getFinancialMutation(administration: Administration, id: string) {
        return this.requestHandler.request<APIFinancialMutation>(`${administration.id}/financial_mutations/${id}${format}`, {method: "GET"})
    }

    public financialMutationLinkBooking(financialMutation: FinancialMutation, options: FinancialMutationLinkBookingOptions) {
        return this.requestHandler.request<void>(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/link_booking${format}`, {
            method: "PATCH",
            body: JSON.stringify(options)
        })
    }

    public financialMutationUnlinkBooking(financialMutation: FinancialMutation, options: FinancialMutationUnlinkBookingOptions) {
        return this.requestHandler.request<void>(`${financialMutation.administration_id}/financial_mutations/${financialMutation.id}/unlink_booking${format}`, {
            method: "DELETE",
            body: JSON.stringify(options)
        })
    }

    public getTaxRates(administration: Administration, filter: TaxRateSearchOptions) {
        const query = Util.queryString({filter: filter as Filter});
        return this.requestHandler.request<APITaxRate[]>(`${administration.id}/tax_rates${format}${query}`, {method: "GET"})
    }

    public getLedgerAccounts(administration: Administration) {
        return this.requestHandler.request<APILedgerAccount[]>(`${administration.id}/ledger_accounts${format}`, {method: "GET"})
    }

    public getLedgerAccount(administration: Administration, id: string) {
        return this.requestHandler.request<APILedgerAccount>(`${administration.id}/ledger_accounts/${id}${format}`, {method: "GET"})
    }

    public addLedgerAccount(administration: Administration, options: AddLedgerAccountOptions, rgs_code: string) {
        return this.requestHandler.request<APILedgerAccount>(`${administration.id}/ledger_accounts${format}`, {
            method: "POST",
            body: JSON.stringify({ledger_account: options, rgs_code: rgs_code})
        })
    }

    public updateLedgerAccount(ledgerAccount: LedgerAccount, options: UpdateLedgerAccountOptions, rgs_code: string) {
        return this.requestHandler.request<APILedgerAccount>(`${ledgerAccount.administration_id}/ledger_accounts/${ledgerAccount.id}${format}`, {
            method: "PATCH",
            body: JSON.stringify({ledger_account: options, rgs_code: rgs_code})
        })
    }

    public deleteLedgerAccount(administration: Administration, ledgerAccountId: string) {
        return this.requestHandler.request<void>(`${administration.id}/ledger_accounts/${ledgerAccountId}${format}`, {
            method: "DELETE",
            body: "{}"
        })
    }

    //#region Reports
    /**
     * Get the assets report for the administration.
     * @see https://developer.moneybird.com/api/reports#assets-report
     */
    public getAssetsReport(administration: Administration, options?: ReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIReportAsset[]>(`${administration.id}/reports/assets${format}${query}`, {method: "GET"})
    }

    /**
     * Get the balance sheet report for the administration showing the financial position at the end of the specified period.
     * @see https://developer.moneybird.com/api/reports#balance-sheet-report
     */
    public getBalanceSheetReport(administration: Administration, options?: ReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIBalanceSheetReport>(`${administration.id}/reports/balance_sheet${format}${query}`, {method: "GET"})
    }

    /**
     * Get the cash flow report for the administration showing cash received and cash paid during the specified period.
     * @see https://developer.moneybird.com/api/reports#cash-flow-report
     */
    public getCashFlowReport(administration: Administration, options?: CashFlowReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APICashFlowReport>(`${administration.id}/reports/cash_flow${format}${query}`, {method: "GET"})
    }

    /**
     * Returns a creditors report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#creditors-report
     */
    public getCreditorsReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APICreditorsReport>(`${administration.id}/reports/creditors${format}${query}`, {method: "GET"})
    }

    /**
     * Returns a debtors report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#debtors-report
     */
    public getDebtorsReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIDebtorsReport>(`${administration.id}/reports/debtors${format}${query}`, {method: "GET"})
    }

    /**
     * Returns an expenses-by-contact report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#expenses-by-contact-report
     */
    public getExpensesByContactReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIExpensesByContactReport>(`${administration.id}/reports/expenses_by_contact${format}${query}`, {method: "GET"})
    }

    /**
     * Returns an expenses-by-project report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#expenses-by-project-report
     */
    public getExpensesByProjectReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIExpensesByProjectReport>(`${administration.id}/reports/expenses_by_project${format}${query}`, {method: "GET"})
    }

    /**
     * Queue the export of an auditfile (XAF XML format) for the specified year. The auditfile will be added to your {@link https://developer.moneybird.com/api/downloads|downloads} when ready.
     * The administration must not have any ledger accounts with missing or duplicate account IDs, and the specified year must contain journal entries.
     * @param administration
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/auditfile#export-auditfile
     */
    public exportAuditfile(administration: Administration, year: number) {
        return this.requestHandler.request<void>(`${administration.id}/reports/export/auditfile${format}`, {
            method: "POST",
            body: JSON.stringify({year: year})
        })
    }

    /**
     * Queue the export of a brugstaat XML file for the specified year. The file will be added to your {@link https://developer.moneybird.com/api/downloads|downloads} when ready.
     * All ledger accounts must have valid RGS taxonomy codes assigned.
     * @param administration
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/brugstaat#export-brugstaat
     */
    public exportBrugstaat(administration: Administration, year: number) {
        return this.requestHandler.request<void>(`${administration.id}/reports/export/brugstaat${format}`, {
            method: "POST",
            body: JSON.stringify({year: year})
        })
    }

    /**
     * Queue the export of ledger accounts (grootboekkaarten) to an Excel file for the specified year. This file contains all bookings and can be used for manual audits. The file will be added to your {@link https://developer.moneybird.com/api/downloads|downloads} when ready.
     * The specified year must contain journal entries.
     * @param administration
     * @param year The year for which to generate the auditfile
     * @see https://developer.moneybird.com/api/ledger_accounts#export-ledger-accounts
     */
    public exportLedgerAccounts(administration: Administration, year: number) {
        return this.requestHandler.request<void>(`${administration.id}/reports/export/ledger_accounts${format}`, {
            method: "POST",
            body: JSON.stringify({year: year})
        })
    }

    /**
     * Get the general ledger report for the administration showing all ledger accounts with their balances and movements during the specified period.
     * @see https://developer.moneybird.com/api/reports#general-ledger-report
     */
    public getGeneralLedgerReport(administration: Administration, options?: ReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIGeneralLedgerReport>(`${administration.id}/reports/general_ledger${format}${query}`, {method: "GET"})
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
    public getJournalEntriesReport(administration: Administration, options?: JournalEntriesReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIReportJournalEntry[]>(`${administration.id}/reports/journal_entries${format}${query}`, {method: "GET"})
    }

    /**
     * Get the profit loss report for the administration.
     * @see https://developer.moneybird.com/api/reports#profit-loss-report
     */
    public getProfitLossReport(administration: Administration, options?: ProfitLossReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIProfitLossReport>(`${administration.id}/reports/profit_loss${format}${query}`, {method: "GET"})
    }

    /**
     * Returns a revenue-by-contact report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#revenue-by-contact-report
     */
    public getRevenueByContactReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIRevenueByContactReport>(`${administration.id}/reports/revenue_by_contact${format}${query}`, {method: "GET"})
    }

    /**
     * Returns a revenue-by-project report for the specified administration.
     * @see https://developer.moneybird.com/api/reports#revenue-by-project-report
     */
    public getRevenueByProjectReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APIRevenueByProjectReport>(`${administration.id}/reports/revenue_by_project${format}${query}`, {method: "GET"})
    }

    /**
     * Get the subscriptions report for the administration.
     * @see https://developer.moneybird.com/api/reports#subscriptions-report
     */
    public getSubscriptionsReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APISubscriptionsReport>(`${administration.id}/reports/subscriptions${format}${query}`, {method: "GET"})
    }

    /**
     * Get the tax report for the administration.
     * @see https://developer.moneybird.com/api/reports#tax-report
     */
    public getTaxReport(administration: Administration, options?: PagedReportOptions) {
        const query = options === undefined ? "" : Util.queryString(options);
        return this.requestHandler.request<APITaxReport>(`${administration.id}/reports/tax${format}${query}`, {method: "GET"})
    }

//#endregion Reports

    /** */
    public getSalesInvoiceByInvoiceId(administration: Administration, salesInvoiceId: string) {
        return this.requestHandler.request<APISalesInvoice>(`${administration.id}/sales_invoices/find_by_invoice_id/${salesInvoiceId}${format}`, {method: "GET"})
    }

    public getSalesInvoiceByReference(administration: Administration, salesInvoiceReference: string) {
        return this.requestHandler.request<APISalesInvoice>(`${administration.id}/sales_invoices/find_by_reference/${salesInvoiceReference}${format}`, {method: "GET"})
    }

    public sendInvoice(invoice: SalesInvoice, options: SendSalesInvoiceOptions) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/send_invoice${format}`, {
            method: "PATCH",
            body: JSON.stringify({sales_invoice_sending: options})
        })
    }

    public registerPaymentCreditInvoice(invoice: SalesInvoice) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/register_payment_creditinvoice${format}`, {
            method: "PATCH",
            body: "{}"
        })
    }

    public duplicateToCreditInvoice(invoice: SalesInvoice) {
        return this.requestHandler.request<APISalesInvoice>(`${invoice.administration_id}/sales_invoices/${invoice.id}/duplicate_creditinvoice${format}`, {
            method: "PATCH",
            body: "{}"
        })
    }

    public getPayment(administration: Administration, id: string) {
        return this.requestHandler.request<APIPayment>(`${administration.id}/payments/${id}${format}`, {method: "GET"})
    }

    public getUsers(administration: Administration, urlOptions: UserSearchOptions) {
        const query = Util.queryString(urlOptions);
        return this.requestHandler.request<APIUser[]>(`${administration.id}/users${format}${query}`, {method: "GET"})
    }

    /**
     * Retrieve all the verifications within an administration. Returns all verified e-mail addresses and bank account numbers, as well as the verified chamber of commerce number and tax number.
     * @see https://developer.moneybird.com/api/verifications#retrieve-verifications
     */
    public getVerifications(administration: Administration) {
        return this.requestHandler.request<APIVerifications>(`${administration.id}/verifications${format}`, {method: "GET"})
    }

    /**
     * Returns a list of all the workflows of an administration.
     * @see https://developer.moneybird.com/api/workflows#retrieve-available-workflows
     */
    public getWorkflows(administration: Administration) {
        return this.requestHandler.request<APIWorkflow[]>(`${administration.id}/workflows${format}`, {method: "GET"})
    }
}