import {Administration} from ".";
import {
    AddressPosition,
    APIDocumentField,
    APIDocumentStyle, APIDownload,
    DownloadType,
    Identifier,
    LogoPosition,
    PaperSize
} from "../types";

/** Downloads are files that have been generated as exports from your administration. These can be CSV exports of contacts, sales invoices, time entries, or various financial reports. */
export class Download {
    id: Identifier;
    user_id?: Identifier
    download_type: DownloadType
    filename: string
    content_type: string
    failed: boolean
    downloaded: boolean
    created_at: Date;
    updated_at: Date;
    private data: Buffer | null = null;

    constructor(public administration: Administration, data: APIDownload) {
        this.id = data.id;
        if(data.user_id) this.user_id = data.user_id;
        this.download_type = data.download_type;
        this.filename = data.filename;
        this.content_type = data.content_type;
        this.failed = data.failed;
        this.downloaded = data.downloaded;
        this.created_at = new Date(data.created_at);
        this.updated_at = new Date(data.updated_at);
    }

    /**
     * Downloads this file
     * @see https://developer.moneybird.com/api/downloads#download-a-file
     */
    async download() {
        if (this.data == null) this.data = (await this.administration.client.rest.downloadFile(this.administration, this.id)).data
        return this.data
    }
}