import { Administration, APILedgerAccount, APILedgerAccountAllowedDocumentTypes, APILedgerAccountType, UpdateLedgerAccountOptions } from "../types";
export declare class LedgerAccount {
    administration: Administration;
    id: string;
    administration_id: string;
    name: string;
    account_type: APILedgerAccountType;
    account_id: string | null;
    created_at: Date;
    updated_at: Date;
    parent_id: string | null;
    allowed_document_types: APILedgerAccountAllowedDocumentTypes[];
    description?: string;
    constructor(administration: Administration, data: APILedgerAccount);
    setData(data: APILedgerAccount): void;
    /** Deletes this contact, or archives it when deleting was not possible. */
    update(options: UpdateLedgerAccountOptions): Promise<this>;
    /** Deletes this contact, or archives it when deleting was not possible. */
    delete(): Promise<void>;
}
