import {ReportAsset} from ".";
import {APIReportAsset} from "../types";

export class AssetsReport {
    public assets: ReportAsset[];

    constructor(data: APIReportAsset[]) {
        this.assets = data.map(asset => new ReportAsset(asset));
    }
}