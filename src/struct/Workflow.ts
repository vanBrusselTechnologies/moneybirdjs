import {Administration, APIWorkflow} from "../types";

export class Workflow {
    id: string;
    administration_id: string;
    type: "EstimateWorkflow" | "InvoiceWorkflow";
    name: string;
    default: boolean;
    currency: string;
    language: string;
    active: boolean;
    prices_are_incl_tax: boolean;
    created_at: Date;
    updated_at: Date;

    constructor(public administration: Administration, data: APIWorkflow) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.type = data.type;
        this.name = data.name;
        this.default = data.default;
        this.currency = data.currency;
        this.language = data.language;
        this.active = data.active;
        this.prices_are_incl_tax = data.prices_are_incl_tax;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}