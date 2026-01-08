import {ReportJournalEntry} from ".";
import {APIReportJournalEntry} from "../types";

export class JournalEntriesReport {
    public journal_entries: ReportJournalEntry[];

    constructor(data: APIReportJournalEntry[]) {
        this.journal_entries = data.map(journalEntry => new ReportJournalEntry(journalEntry));
    }
}