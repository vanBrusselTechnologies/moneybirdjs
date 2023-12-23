"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const struct_1 = require("../struct");
/** Contains various general-purpose utility methods. */
class Util extends null {
    /** Returns a string containing a query string suitable for use in a URL. */
    static queryString(options) {
        const entries = Object.entries(options).map(e => e[0] === 'filter' || e[0] === 'new_filter' ? [e[0], this.encodeFilterString(e[1])] : e);
        const query = new URLSearchParams(entries).toString();
        return query.length ? `?${query}` : query;
    }
    /** Returns a string containing a filter string suitable for use in a URL query string. */
    static encodeFilterString(filter) {
        return Object.entries(filter).filter(v => v[1]).map(v => {
            if (v[1] instanceof Date)
                return `${v[0]}:${v[1].toISOString()}`;
            return `${v[0]}:${v[1]}`;
        }).filter(f => f.length > 0).join(',');
    }
    static entityToEntityType(entity) {
        switch (entity.constructor) {
            case struct_1.Contact:
                return 'contact';
            case struct_1.ExternalSalesInvoice:
                return 'externalSalesInvoice';
            case struct_1.FinancialMutation:
                return 'financialMutation';
            case struct_1.GeneralDocument:
                return 'generalDocument';
            case struct_1.JournalDocument:
                return 'journalDocument';
            case struct_1.PurchaseInvoice:
                return 'purchaseInvoice';
            case struct_1.Receipt:
                return 'receipt';
            case struct_1.SalesInvoice:
                return 'salesInvoice';
            case struct_1.TypelessDocument:
                return 'typelessDocument';
            default:
                throw TypeError(`entity ${entity.constructor} not found!`);
        }
    }
    /** Returns the base entity dependent string for the rest URL */
    static entityRestUrl(entityType) {
        switch (entityType) {
            case 'contact':
                return 'contacts';
            case 'externalSalesInvoice':
                return 'external_sales_invoices';
            case 'financialMutation':
                return 'financial_mutations';
            case 'generalDocument':
                return 'documents/general_documents';
            case 'journalDocument':
                return 'documents/general_journal_documents';
            case 'purchaseInvoice':
                return 'documents/purchase_invoices';
            case 'receipt':
                return 'documents/receipts';
            case 'salesInvoice':
                return 'sales_invoices';
            case 'typelessDocument':
                return 'documents/typeless_documents';
            default:
                throw TypeError(`entityType ${entityType} not found!`);
        }
    }
    /** Returns the base body for requests */
    static entityRequestBody(entityType, options) {
        switch (entityType) {
            case 'contact':
                return { contact: options };
            case 'externalSalesInvoice':
                return { external_sales_invoice: options };
            case "generalDocument":
                return { general_document: options };
            case "journalDocument":
                return { general_journal_document: options };
            case "purchaseInvoice":
                return { purchase_invoice: options };
            case "receipt":
                return { receipt: options };
            case "salesInvoice":
                return { sales_invoice: options };
            case "typelessDocument":
                return { typeless_document: options };
            default:
                throw TypeError(`entityType ${entityType} not found!`);
        }
    }
}
exports.Util = Util;
