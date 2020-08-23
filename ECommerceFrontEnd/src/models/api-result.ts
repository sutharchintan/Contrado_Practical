import { ExceptionModel } from "./exception";

/**
 * stores the api result
 */
export class ApiResult<T> {

    /**
     * stores the data
     */
    Data: T;

    /**
     * Indicates whether the api call is success or not
     */
    IsSuccess: boolean;

    /**
     * stores the error as exception model
     */
    Error: ExceptionModel;
}