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
    /**
     * @param options
     * @param rgs_code Existing RGS version 3.5 code, e.g. ‘WMfoBelMfo’
     */
    update(options: UpdateLedgerAccountOptions, rgs_code: string): Promise<this>;
    delete(): Promise<void>;
}
