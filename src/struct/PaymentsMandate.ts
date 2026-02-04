import {APIPaymentsMandate} from "../types";

export class PaymentsMandate {
    type?: string
    sepa_mandate: boolean
    bank?: string
    iban?: string
    bic?: string
    iban_account_name?: string
    card_expiry_month?: number
    card_expiry_year?: number
    card_final_digits?: string
    created_at: Date

    constructor(data: APIPaymentsMandate) {
        if (data.type) this.type = data.type;
        this.sepa_mandate = data.sepa_mandate;
        if (data.bank) this.bank = data.bank;
        if (data.iban) this.iban = data.iban;
        if (data.bic) this.bic = data.bic;
        if (data.iban_account_name) this.iban_account_name = data.iban_account_name;
        if (data.card_expiry_month) this.card_expiry_month = parseInt(data.card_expiry_month);
        if (data.card_expiry_year) this.card_expiry_year = parseInt(data.card_expiry_year);
        if (data.card_final_digits) this.card_final_digits = data.card_final_digits;
        this.created_at = new Date(data.created_at);
    }
}