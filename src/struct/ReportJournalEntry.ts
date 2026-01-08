import {APIReportJournalEntry, Identifier} from "../types";

export class ReportJournalEntry {
    /** Unique identifier for the journal entry */
    public id: string
    /** Date of the journal entry */
    public date: Date
    /** Type of document this entry relates to */
    public document_type: string
    /** ID of the related document */
    public document_id: Identifier
    /** ID of the ledger account */
    public ledger_account_id: Identifier
    /** ID of the related project, if any */
    public project_id?: Identifier
    /** ID of the related contact, if any */
    public contact_id?: Identifier
    /** ID of the applied tax rate, if any */
    public tax_rate_id?: Identifier
    /** ID of the financial account, if any */
    public financial_account_id?: Identifier
    /** Amount of the journal entry in the administration's currency */
    public amount: number
    /** Description of the journal entry */
    public description: string

    constructor(data: APIReportJournalEntry) {
        this.id = data.id;
        this.date = new Date(data.date);
        this.document_type = data.document_type;
        this.document_id = data.document_id;
        this.ledger_account_id = data.ledger_account_id;
        if (data.project_id) this.project_id = data.project_id;
        if (data.contact_id) this.contact_id = data.contact_id;
        if (data.tax_rate_id) this.tax_rate_id = data.tax_rate_id;
        if (data.financial_account_id) this.financial_account_id = data.financial_account_id;
        this.amount = parseFloat(data.amount);
        this.description = data.description;
    }
}