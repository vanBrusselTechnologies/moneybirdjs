import { Entity, EntityType, Filter, UrlOptions } from "../types";
/** Contains various general-purpose utility methods. */
export declare class Util extends null {
    /** Returns a string containing a query string suitable for use in a URL. */
    static queryString(options: UrlOptions): string;
    /** Returns a string containing a filter string suitable for use in a URL query string. */
    static encodeFilterString(filter: Filter): string;
    static entityToEntityType(entity: Entity): EntityType;
    /** Returns the base entity dependent string for the rest URL */
    static entityRestUrl(entityType: EntityType): string;
    /** Returns the base body for requests */
    static entityRequestBody<T>(entityType: EntityType, options: T): {
        [key: string]: T;
    };
}
