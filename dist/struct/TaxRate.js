"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxRate = void 0;
class TaxRate {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.percentage = parseFloat(data.percentage);
        this.tax_rate_type = data.tax_rate_type;
        this.show_tax = data.show_tax;
        this.active = data.active;
        this.country = data.country;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}
exports.TaxRate = TaxRate;
