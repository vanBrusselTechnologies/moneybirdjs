import {APIVerifications} from "../types";

/** Verifications are used to retrieve all verified information within an administration, such as e-mail addresses, bank account numbers, Chamber of Commerce numbers, and tax numbers. */
export class Verifications {
    emails?: string[];
    bank_account_numbers?: string[];
    chamber_of_commerce_number?: string;
    tax_number?: string;

    constructor(data: APIVerifications) {
        this.emails = data.emails;
        this.bank_account_numbers = data.bank_account_numbers;
        this.chamber_of_commerce_number = data.chamber_of_commerce_number;
        this.tax_number = data.tax_number;
    }
}