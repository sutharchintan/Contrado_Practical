/**
 * list response model
 */
export class ListResponse<T> {
    /**
     * defines the items
     */
    Items: T[];

    /**
     * defines the count
     */
    Count: number;
}