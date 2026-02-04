import {APIAdditionalCharge, Identifier, Period} from "../types";

export class AdditionalCharge {
    public id: Identifier;
    public administration_id: Identifier;
    public contact_id?: Identifier;
    public subscription_id?: Identifier;
    public product_id: Identifier;
    public detail_id?: Identifier;
    public amount: string;
    public price: number;
    public period: Period;
    public description: string;

    constructor(data: APIAdditionalCharge) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        if (data.contact_id) this.contact_id = data.contact_id;
        if (data.subscription_id) this.subscription_id = data.subscription_id;
        this.product_id = data.product_id;
        if (data.detail_id) this.detail_id = data.detail_id;
        this.amount = data.amount ?? "";
        this.price = parseFloat(data.price);
        this.period = data.period;
        this.description = data.description;
    }
}