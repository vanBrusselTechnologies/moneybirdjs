import { RequestOptions, Response } from "../types";
export declare class RequestHandler {
    #private;
    rejectIfNotValid: boolean;
    rateLimit: number;
    constructor(apiToken: string);
    request<T>(path: string, options: RequestOptions): Promise<Response<T>>;
    private exec;
}
