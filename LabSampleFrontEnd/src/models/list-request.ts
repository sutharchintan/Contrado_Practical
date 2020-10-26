/**
 * class for list request
 */
export class ListRequest<T> {
    /**
     * page number
     */
    PageNumber: number;

    /**
     * page size
     */
    PageSize: number;

    /**
     * sorting direction
     */
    SortingDirection: string;

    /**
     * sorting field
     */
    SortingField: string;

    /**
     * defines the filter model
     */
    FilterModel: T;
}