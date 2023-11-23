import { APICustomField, CustomFieldSource } from "../types";
import { Administration } from "./Administration";
export declare class CustomField {
    administration: Administration;
    id: string;
    administration_id: string;
    name: string;
    source: CustomFieldSource;
    constructor(administration: Administration, data: APICustomField);
}
