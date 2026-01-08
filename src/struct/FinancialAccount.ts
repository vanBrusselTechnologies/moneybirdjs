import {Administration} from ".";
import {APIFinancialAccount} from "../types";

export class FinancialAccount {
    public id: string;
    public administration_id: string;
    public type: string;
    public name: string;
    public identifier: string;
    public currency: string;
    public provider: string | null;
    public active: boolean;
    public created_at: Date;
    public updated_at: Date;

    constructor(public administration: Administration, data: APIFinancialAccount) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.type = data.type;
        this.name = data.name;
        this.identifier = data.identifier;
        this.currency = data.currency;
        this.provider = data.provider;
        this.active = data.active;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.created_at);
    }
}