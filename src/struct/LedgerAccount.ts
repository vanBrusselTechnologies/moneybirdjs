import {
    Administration,
    APILedgerAccount,
    APILedgerAccountAllowedDocumentTypes,
    APILedgerAccountType,
    UpdateLedgerAccountOptions
} from "../types";

export class LedgerAccount {
    id: string;
    administration_id: string;
    name: string;
    account_type: APILedgerAccountType;
    account_id: string | null;
    created_at: Date;
    updated_at: Date;
    parent_id: string | null;
    allowed_document_types: APILedgerAccountAllowedDocumentTypes[];
    description?: string

    constructor(public administration: Administration, data: APILedgerAccount) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.account_id = data.account_id
        this.account_type = data.account_type;
        this.parent_id = data.parent_id;
        this.allowed_document_types = data.allowed_document_types;
        this.description = data.description;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    setData(data: APILedgerAccount){
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.account_id = data.account_id
        this.account_type = data.account_type;
        this.parent_id = data.parent_id;
        this.allowed_document_types = data.allowed_document_types;
        this.description = data.description;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    /** Deletes this contact, or archives it when deleting was not possible. */
    async update(options: UpdateLedgerAccountOptions) {
        const {data} = await this.administration.client.rest.updateLedgerAccount(this, options)
        this.setData(data)
        return this;
    }

    /** Deletes this contact, or archives it when deleting was not possible. */
    async delete() {
        await this.administration.deleteLedgerAccount(this.id)
    }
}