import {APIBalanceSheetLedgerAccount, Identifier} from "../types";

export class BalanceSheetLedgerAccount {
    public ledger_account_id: Identifier;
    public value: number;
    public children: BalanceSheetLedgerAccount[];
    public isParent: boolean;

    constructor(data: APIBalanceSheetLedgerAccount) {
        this.ledger_account_id = data.ledger_account_id;
        this.value = parseFloat(data.value);
        this.children = (data.children ?? []).map(child => new BalanceSheetLedgerAccount(child));
        this.isParent = this.children?.length > 0
    }
}