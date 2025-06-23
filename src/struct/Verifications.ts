import {Administration, APIVerifications} from "../types";

// noinspection JSUnusedGlobalSymbols
/** */
export class Verifications {
    emails?: string[];
    bank_account_numbers?: string[];
    chamber_of_commerce_number?: string;
    tax_number?: string;

    constructor(public administration: Administration, data: APIVerifications) {
        this.emails = data.emails;
        this.bank_account_numbers = data.bank_account_numbers;
        this.chamber_of_commerce_number = data.chamber_of_commerce_number;
        this.tax_number = data.tax_number;
    }
}