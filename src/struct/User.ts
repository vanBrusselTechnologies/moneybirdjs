import {Administration, APIUser, APIUserPermissions} from "../types";

// noinspection JSUnusedGlobalSymbols
/** */
export class User {
    public id: string;
    public name: string;
    public created_at: Date;
    public updated_at: Date;
    public email?: string;
    public email_validated?: boolean;
    public language?: string;
    public time_zone?: string;
    public user_type?: "owner" | "employee" | "accountant";
    public permissions?: APIUserPermissions[];

    constructor(public administration: Administration, data: APIUser) {
        this.id = data.id;
        this.name = data.name;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
        this.email = data.email;
        this.email_validated = data.email_validated;
        this.language = data.language;
        this.time_zone = data.time_zone;
        this.user_type = data.user_type;
        this.permissions = data.permissions;
    }
}