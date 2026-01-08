import {ReportProject} from ".";
import {APIExpensesByProjectReport} from "../types";

export class ExpensesByProjectReport {
    public expenses_by_project: ReportProject[];

    constructor(data: APIExpensesByProjectReport) {
        this.expenses_by_project = data.expenses_by_project.map(project => new ReportProject(project));
    }
}