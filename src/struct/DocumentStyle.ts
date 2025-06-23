import {APIDocumentField, APIDocumentStyle} from "../types";
import {Administration} from "../struct";

// noinspection JSUnusedGlobalSymbols
/** */
export class DocumentStyle {
    id: string;
    administration_id: string;
    name: string;
    identity_id: string;
    default: boolean;
    logo_hash: string;
    logo_container_full_width: boolean;
    logo_display_width: number;
    logo_position: string;
    background_hash: string;
    paper_size: string;
    address_position: string;
    font_size: 9 | 10 | 11 | 12;
    font_family: string;
    print_on_stationery: boolean;
    custom_css: string;
    invoice_sender_address: APIDocumentField[];
    invoice_metadata_left: APIDocumentField[];
    invoice_metadata_right: APIDocumentField[];
    estimate_sender_address: APIDocumentField[];
    estimate_metadata_left: APIDocumentField[];
    estimate_metadata_right: APIDocumentField[];
    created_at: Date;
    updated_at: Date;

    constructor(public administration: Administration, data: APIDocumentStyle) {
        this.id = data.id;
        this.administration_id = data.administration_id;
        this.name = data.name;
        this.identity_id = data.identity_id;
        this.default = data.default;
        this.logo_hash = data.logo_hash;
        this.logo_container_full_width = data.logo_container_full_width;
        this.logo_display_width = data.logo_display_width;
        this.logo_position = data.logo_position;
        this.background_hash = data.background_hash;
        this.paper_size = data.paper_size;
        this.address_position = data.address_position;
        this.font_size = data.font_size;
        this.font_family = data.font_family;
        this.print_on_stationery = data.print_on_stationery;
        this.custom_css = data.custom_css;
        this.invoice_sender_address = data.invoice_sender_address;
        this.invoice_metadata_left = data.invoice_metadata_left;
        this.invoice_metadata_right = data.invoice_metadata_right;
        this.estimate_sender_address = data.estimate_sender_address;
        this.estimate_metadata_left = data.invoice_metadata_left;
        this.estimate_metadata_right = data.estimate_metadata_right;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }
}