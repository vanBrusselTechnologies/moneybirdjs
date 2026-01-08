import {ReportProject} from ".";
import {APIRevenueByProjectReport} from "../types";

export class RevenueByProjectReport {
    public revenue_by_project: ReportProject[];

    constructor(data: APIRevenueByProjectReport) {
        this.revenue_by_project = data.revenue_by_project.map(project => new ReportProject(project));
    }
}