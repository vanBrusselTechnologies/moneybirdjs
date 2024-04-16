"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerAccount = void 0;
class LedgerAccount {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.account_id = data.account_id;
        this.account_type = data.account_type;
        this.parent_id = data.parent_id;
        this.allowed_document_types = data.allowed_document_types;
        this.description = data.description;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
    setData(data) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.account_id = data.account_id;
        this.account_type = data.account_type;
        this.parent_id = data.parent_id;
        this.allowed_document_types = data.allowed_document_types;
        this.description = data.description;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
    /**
     * @param options
     * @param rgs_code Existing RGS version 3.5 code, e.g. ‘WMfoBelMfo’
     */
    async update(options, rgs_code) {
        const { data } = await this.administration.client.rest.updateLedgerAccount(this, options, rgs_code);
        this.setData(data);
        return this;
    }
    async delete() {
        await this.administration.deleteLedgerAccount(this.id);
    }
}
exports.LedgerAccount = LedgerAccount;
