import { AddContactOptions, AddExternalSalesInvoiceOptions, AddGeneralDocumentOptions, AddJournalDocumentOptions, AddLedgerAccountOptions, AddPurchaseInvoiceOptions, AddReceiptOptions, AddSalesInvoiceOptions, AddTypelessDocumentOptions, APIAdministration, ContactSearchOptions, EntityType, ExternalSalesInvoiceSearchOptions, Filter, GeneralDocumentSearchOptions, JournalDocumentSearchOptions, PurchaseInvoiceSearchOptions, ReceiptSearchOptions, SalesInvoiceSearchOptions, TaxRateSearchOptions, TypelessDocumentSearchOptions } from "../types";
import { Client } from "../client/Client";
import { Contact, CustomField, DocumentStyle, ExternalSalesInvoice, GeneralDocument, JournalDocument, PurchaseInvoice, Receipt, SalesInvoice, TaxRate, TypelessDocument, FinancialMutation, LedgerAccount } from "../struct";
/** */
export declare class Administration {
    client: Client;
    id: string;
    name: string;
    language: string;
    currency: string;
    country: string;
    time_zone: string;
    access: string;
    constructor(client: Client, data: APIAdministration);
    /**
     * Returns all entities of entityType in the administration. The list contains the id and the version of the entity. Check if the version of the document is newer than the version you have stored locally.
     * @param entityType
     * @param filter
     */
    listIdsAndVersions(entityType: EntityType, filter?: Filter): Promise<{
        id: string;
        version: number;
    }[]>;
    listContactsByIds(ids: Array<string>): Promise<Contact[]>;
    getContacts(options?: ContactSearchOptions): Promise<Contact[]>;
    getContact(contactId: string): Promise<Contact>;
    getContactByCustomerId(customerId: string): Promise<Contact>;
    addContact(options: AddContactOptions): Promise<Contact>;
    /** Deletes the contact by contactId, or archives it when deleting was not possible. */
    deleteContact(contactId: string): Promise<void>;
    getCustomFields(): Promise<CustomField[]>;
    getDocumentStyles(): Promise<DocumentStyle[]>;
    listGeneralDocumentsByIds(ids: Array<string>): Promise<GeneralDocument[]>;
    getGeneralDocuments(options?: GeneralDocumentSearchOptions): Promise<GeneralDocument[]>;
    getGeneralDocument(generalDocumentId: string): Promise<GeneralDocument>;
    addGeneralDocument(options: AddGeneralDocumentOptions): Promise<GeneralDocument>;
    deleteGeneralDocument(generalDocumentId: string, refresh_journal_entries?: boolean): Promise<void>;
    listJournalDocumentsByIds(ids: Array<string>): Promise<JournalDocument[]>;
    getJournalDocuments(options?: JournalDocumentSearchOptions): Promise<JournalDocument[]>;
    getJournalDocument(journalDocumentId: string): Promise<JournalDocument>;
    addJournalDocument(options: AddJournalDocumentOptions): Promise<JournalDocument>;
    deleteJournalDocument(journalDocumentId: string, refresh_journal_entries?: boolean): Promise<void>;
    listPurchaseInvoicesByIds(ids: Array<string>): Promise<PurchaseInvoice[]>;
    getPurchaseInvoices(options?: PurchaseInvoiceSearchOptions): Promise<PurchaseInvoice[]>;
    getPurchaseInvoice(purchaseInvoiceId: string): Promise<PurchaseInvoice>;
    addPurchaseInvoice(options: AddPurchaseInvoiceOptions): Promise<PurchaseInvoice>;
    deletePurchaseInvoice(purchaseInvoiceId: string, refresh_journal_entries?: boolean): Promise<void>;
    listReceiptsByIds(ids: Array<string>): Promise<Receipt[]>;
    getReceipts(options?: ReceiptSearchOptions): Promise<Receipt[]>;
    getReceipt(receiptId: string): Promise<Receipt>;
    addReceipt(options: AddReceiptOptions): Promise<Receipt>;
    deleteReceipt(receiptId: string, refresh_journal_entries?: boolean): Promise<void>;
    listTypelessDocumentsByIds(ids: Array<string>): Promise<TypelessDocument[]>;
    getTypelessDocuments(options?: TypelessDocumentSearchOptions): Promise<TypelessDocument[]>;
    getTypelessDocument(typelessDocumentId: string): Promise<TypelessDocument>;
    addTypelessDocument(options: AddTypelessDocumentOptions): Promise<TypelessDocument>;
    deleteTypelessDocument(typelessDocumentId: string, refresh_journal_entries?: boolean): Promise<void>;
    listExternalSalesInvoicesByIds(ids: Array<string>): Promise<ExternalSalesInvoice[]>;
    getExternalSalesInvoices(options?: ExternalSalesInvoiceSearchOptions): Promise<ExternalSalesInvoice[]>;
    getExternalSalesInvoice(externalSalesInvoiceId: string): Promise<ExternalSalesInvoice>;
    addExternalSalesInvoice(options: AddExternalSalesInvoiceOptions): Promise<ExternalSalesInvoice>;
    deleteExternalSalesInvoice(externalSalesInvoiceId: string, refresh_journal_entries?: boolean): Promise<void>;
    /** When requesting huge number of mutations, use the Sync API: {@link listIdsAndVersions()} + {@link listFinancialMutationsByIds()} */
    getFinancialMutations(filter: Filter): Promise<FinancialMutation[]>;
    listFinancialMutationsByIds(ids: Array<string>): Promise<FinancialMutation[]>;
    /** Returns a single financial mutation in the administration. */
    getFinancialMutation(financialMutationId: string): Promise<FinancialMutation>;
    getLedgerAccounts(): Promise<LedgerAccount[]>;
    getLedgerAccount(ledgerAccountId: string): Promise<LedgerAccount>;
    /**
     * @param options
     * @param rgs_code Existing RGS version 3.5 code, e.g. ‘WMfoBelMfo’
     */
    addLedgerAccount(options: AddLedgerAccountOptions, rgs_code: string): Promise<LedgerAccount>;
    deleteLedgerAccount(ledgerAccountId: string): Promise<void>;
    listSalesInvoicesByIds(ids: Array<string>): Promise<SalesInvoice[]>;
    getSalesInvoices(options?: SalesInvoiceSearchOptions): Promise<SalesInvoice[]>;
    getSalesInvoice(salesInvoiceId: string): Promise<SalesInvoice>;
    getSalesInvoiceByInvoiceId(invoiceId: string): Promise<SalesInvoice>;
    getSalesInvoiceByReference(reference: string): Promise<SalesInvoice>;
    addSalesInvoice(options: AddSalesInvoiceOptions): Promise<SalesInvoice>;
    deleteSalesInvoice(salesInvoiceId: string, refresh_journal_entries?: boolean): Promise<void>;
    /** Returns a paginated list of all available tax rates for the administration */
    getTaxRates(filter?: TaxRateSearchOptions): Promise<TaxRate[]>;
}
