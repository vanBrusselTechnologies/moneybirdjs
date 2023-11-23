import {APICustomField, CustomFieldSource} from "../types";
import {Administration} from "./Administration";

export class CustomField {
    public id: string;
    public administration_id: string;
    public name: string;
    public source: CustomFieldSource;

    constructor(public administration: Administration, data: APICustomField) {
        this.id = data.id;
        this.administration_id = data.administration_id ?? administration.id;
        this.name = data.name;
        this.source = data.source
    }
}