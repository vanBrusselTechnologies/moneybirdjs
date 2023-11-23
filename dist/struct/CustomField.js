"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomField = void 0;
class CustomField {
    constructor(administration, data) {
        this.administration = administration;
        this.id = data.id;
        this.administration_id = data.administration_id ?? administration.id;
        this.name = data.name;
        this.source = data.source;
    }
}
exports.CustomField = CustomField;
