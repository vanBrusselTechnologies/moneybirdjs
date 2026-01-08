import {APIReportProject, Identifier} from "../types";

export class ReportProject {
    public project_id: Identifier | null;
    public amount: number;

    constructor(data: APIReportProject) {
        this.project_id = data.project_id;
        this.amount = parseFloat(data.amount);
    }
}