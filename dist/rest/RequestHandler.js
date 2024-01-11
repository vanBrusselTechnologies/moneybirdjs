"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RequestHandler_apiToken;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const Constants = __importStar(require("../util/Constants"));
class RequestHandler {
    constructor(apiToken) {
        this.rejectIfNotValid = true;
        this.rateLimit = 10;
        _RequestHandler_apiToken.set(this, void 0);
        __classPrivateFieldSet(this, _RequestHandler_apiToken, apiToken, "f");
    }
    async request(path, options) {
        return this.exec(path, options);
    }
    async exec(path, options, retries = 0) {
        try {
            let contentType = 'application/json';
            if (options.additionalHeaders?.["content-type"]) {
                contentType = options.additionalHeaders["content-type"];
                delete options.additionalHeaders["content-type"];
            }
            const headers = {
                'Authorization': `Bearer ${__classPrivateFieldGet(this, _RequestHandler_apiToken, "f")}`,
                'Content-Type': contentType,
                ...options.additionalHeaders
            };
            const res = await fetch(`${Constants.APIBaseURL}${path}`, {
                method: options.method, headers: headers,
                body: options.method !== 'GET' ? options.body : undefined
            });
            if (res.status >= 500 && retries < this.rateLimit) {
                return this.exec(path, options, ++retries);
            }
            if (res.status === 429) {
                const retryAfter = parseInt(res.headers.get('Retry-After'));
                const rateLimitRemaining = parseInt(res.headers.get('RateLimit-Remaining'));
                //const rateLimitLimit = parseInt(res.headers.get('RateLimit-Limit')!)
                const rateLimitReset = parseInt(res.headers.get('RateLimit-Reset'));
                const timeoutMS = (1 + (rateLimitRemaining < 10 ? rateLimitReset : retryAfter)) * 1000 - Date.now();
                await new Promise((resolve) => {
                    setTimeout(resolve, timeoutMS);
                });
                return this.exec(path, options, ++retries);
            }
            if (res.status === 204)
                return {
                    data: {},
                    status: 204,
                    maxAge: 0,
                    path,
                    ok: true
                };
            let data = null;
            if (res.body != null) {
                data = res.body;
                const chunks = [];
                const reader = data.getReader();
                while (true) {
                    const { value, done } = await reader.read();
                    if (value !== undefined)
                        chunks.push(value);
                    if (done)
                        break;
                }
                const buffer = Buffer.concat(chunks);
                try {
                    data = JSON.parse(buffer.toString());
                }
                catch (e) {
                    const contentDisposition = res.headers?.get('content-disposition');
                    if (contentDisposition?.startsWith('attachment')) {
                        data = buffer;
                    }
                }
            }
            const isOk = res.status === 200 || res.status === 201;
            if (!isOk)
                throw new Error(`non valid: ${res.status} ${JSON.stringify(res)}`);
            return { data: data, status: res.status, maxAge: 0, path, ok: isOk };
            //https://developer.moneybird.com/#responses
        }
        catch (e) {
            // fetch error timeout and rate-limit not reached yet -> Try again
            if (e instanceof Error && e.message === 'fetch failed' && retries < this.rateLimit) {
                return this.exec(path, options, ++retries);
            }
            if (this.rejectIfNotValid)
                throw e;
            return {
                data: { message: e.message },
                maxAge: 0,
                status: 500,
                path,
                ok: false
            };
        }
    }
}
exports.RequestHandler = RequestHandler;
_RequestHandler_apiToken = new WeakMap();
