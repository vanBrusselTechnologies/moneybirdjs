import { APIDocumentDetail, Entity } from "../types";
export declare class DocumentDetail {
    entity: Entity;
    id: string;
    administration_id: string;
    tax_rate_id: string;
    ledger_account_id: string;
    project_id: string | null;
    product_id: string | null;
    amount: string | null;
    amount_decimal: number;
    description: string;
    price: number;
    period: string | null;
    row_order: number;
    total_price_excl_tax_with_discount: number;
    total_price_excl_tax_with_discount_base: number;
    tax_report_reference: string[];
    mandatory_tax_text: string | null;
    created_at: Date;
    updated_at: Date;
    constructor(entity: Entity, data: APIDocumentDetail);
}
