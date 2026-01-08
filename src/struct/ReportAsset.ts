import {APIReportAsset, Identifier} from "../types";

export class ReportAsset {
    public asset_id: Identifier;
    public ledger_account_id: Identifier;
    public name: string;
    public purchase_date: Date;
    /** In seconds */
    public lifespan?: number;
    public purchase_value: number;
    public residual_value: number;
    public total_value_changes_since_purchase: number;
    public value_at_begin: number;
    public investment: number;
    public depreciation: number;
    public divestment: number;
    public value_changes: number;
    public value_at_end: number;

    constructor(data: APIReportAsset) {
        this.asset_id = data.asset_id;
        this.ledger_account_id = data.ledger_account_id;
        this.name = data.name;
        this.purchase_date = new Date(data.purchase_date);
        if (data.lifespan) this.lifespan = parseInt(data.lifespan);
        this.purchase_value = parseFloat(data.purchase_value);
        this.residual_value = parseFloat(data.residual_value);
        this.total_value_changes_since_purchase = parseFloat(data.total_value_changes_since_purchase);
        this.value_at_begin = parseFloat(data.value_at_begin);
        this.investment = parseFloat(data.investment);
        this.depreciation = parseFloat(data.depreciation);
        this.divestment = parseFloat(data.divestment);
        this.value_changes = parseFloat(data.value_changes);
        this.value_at_end = parseFloat(data.value_at_end);
    }
}