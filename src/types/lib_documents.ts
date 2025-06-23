import {
    ExternalSalesInvoice,
    GeneralDocument,
    JournalDocument,
    PurchaseInvoice,
    Receipt,
    TypelessDocument
} from "../struct";
import {
    AddGeneralDocumentOptions,
    GeneralDocumentSearchOptions,
    UpdateGeneralDocumentOptions
} from "./lib_documents_general";
import {
    AddJournalDocumentOptions,
    JournalDocumentSearchOptions,
    UpdateJournalDocumentOptions
} from "./lib_documents_journal";
import {
    AddPurchaseInvoiceOptions,
    PurchaseInvoiceSearchOptions,
    UpdatePurchaseInvoiceOptions
} from "./lib_documents_purchaseInvoice";
import {
    AddExternalSalesInvoiceOptions,
    ExternalSalesInvoiceSearchOptions,
    UpdateExternalSalesInvoiceOptions
} from "./lib_externalSalesInvoice";
import {AddReceiptOptions, ReceiptSearchOptions, UpdateReceiptOptions} from "./lib_documents_receipt";
import {AddTypelessDocumentOptions, TypelessDocumentSearchOptions} from "./lib_documents_typeless";
import {SalesInvoice} from "../struct";
import {AddSalesInvoiceOptions, SalesInvoiceSearchOptions, UpdateSalesInvoiceOptions} from "./lib_salesInvoice";

export * from "./lib_documents_general";
export * from "./lib_documents_journal";
export * from "./lib_documents_purchaseInvoice";
export * from "./lib_documents_receipt";
export * from "./lib_documents_typeless";
export * from "./lib_externalSalesInvoice";
export * from "./lib_salesInvoice";

export type Document =
    GeneralDocument
    | JournalDocument
    | PurchaseInvoice
    | Receipt
    | TypelessDocument
    | ExternalSalesInvoice
    | SalesInvoice
export type DocumentEntityType =
    'generalDocument'
    | 'journalDocument'
    | 'purchaseInvoice'
    | 'receipt'
    | 'typelessDocument'
    | 'externalSalesInvoice'
    | 'salesInvoice';
export type DocumentSearchOptions =
    GeneralDocumentSearchOptions
    | JournalDocumentSearchOptions
    | PurchaseInvoiceSearchOptions
    | ReceiptSearchOptions
    | TypelessDocumentSearchOptions
    | ExternalSalesInvoiceSearchOptions
    | SalesInvoiceSearchOptions
export type DocumentAddOptions =
    AddGeneralDocumentOptions
    | AddJournalDocumentOptions
    | AddPurchaseInvoiceOptions
    | AddReceiptOptions
    | AddTypelessDocumentOptions
    | AddExternalSalesInvoiceOptions
    | AddSalesInvoiceOptions
export type DocumentUpdateOptions =
    UpdateGeneralDocumentOptions
    | UpdateJournalDocumentOptions
    | UpdatePurchaseInvoiceOptions
    | UpdateReceiptOptions
    | UpdateExternalSalesInvoiceOptions
    | UpdateSalesInvoiceOptions