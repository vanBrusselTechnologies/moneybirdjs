import {Entity, EntityType, Filter, UrlOptions} from "../types";
import {
    Contact,
    FinancialMutation,
    GeneralDocument,
    JournalDocument,
    PurchaseInvoice,
    Receipt,
    TypelessDocument,
    ExternalSalesInvoice
} from "../struct";

/** Contains various general-purpose utility methods. */
export class Util extends null {
    /** Returns a string containing a query string suitable for use in a URL. */
    public static queryString(options: UrlOptions): string {
        const entries = Object.entries(options).map(e => e[0] === 'filter' || e[0] === 'new_filter' ? [e[0], this.encodeFilterString(e[1])] : e)
        const query = new URLSearchParams(entries).toString();
        return query.length ? `?${query}` : query;
    }

    /** Returns a string containing a filter string suitable for use in a URL query string. */
    public static encodeFilterString(filter: Filter): string {
        return Object.entries(filter).filter(v => v[1]).map(v => {
            if (v[1] instanceof Date) return `${v[0]}:${v[1].toISOString()}`
            return `${v[0]}:${v[1]}`
        }).filter(f => f.length > 0).join(',');
    }

    public static entityToEntityType(entity: Entity): EntityType {
        switch (entity.constructor) {
            case Contact:
                return 'contact';
            case ExternalSalesInvoice:
                return 'externalSalesInvoice';
            case FinancialMutation:
                return 'financialMutation';
            case GeneralDocument:
                return 'generalDocument';
            case JournalDocument:
                return 'journalDocument';
            case PurchaseInvoice:
                return 'purchaseInvoice';
            case Receipt:
                return 'receipt';
            case TypelessDocument:
                return 'typelessDocument';
            default:
                throw TypeError(`entity ${entity.constructor} not found!`);
        }
    }

    /** Returns the base entity dependent string for the rest URL */
    public static entityRestUrl(entityType: EntityType): string {
        switch (entityType) {
            case 'contact':
                return 'contacts';
            case 'externalSalesInvoice':
                return 'external_sales_invoices'
            case 'financialMutation':
                return 'financial_mutations'
            case 'generalDocument':
                return 'documents/general_documents';
            case 'journalDocument':
                return 'documents/general_journal_documents';
            case 'purchaseInvoice':
                return 'documents/purchase_invoices';
            case 'receipt':
                return 'documents/receipts';
            case 'typelessDocument':
                return 'documents/typeless_documents';
            default:
                throw TypeError(`entityType ${entityType} not found!`);
        }
    }

    /** Returns the base body for requests */
    public static entityRequestBody<T>(entityType: EntityType, options: T): { [key: string]: T } {
        switch (entityType) {
            case 'contact':
                return {contact: options};
            case 'externalSalesInvoice':
                return {external_sales_invoice: options};
            case "generalDocument":
                return {general_document: options};
            case "journalDocument":
                return {general_journal_document: options};
            case "purchaseInvoice":
                return {purchase_invoice: options};
            case "receipt":
                return {receipt: options};
            case "typelessDocument":
                return {typeless_document: options};
            default:
                throw TypeError(`entityType ${entityType} not found!`);
        }
    }
}