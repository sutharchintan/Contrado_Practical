/**
 * class for exception model
 */
export class ExceptionModel {

    /**
     * stores the exception id
     */
    ExceptionId: number;

    /**
     * stores the exception message
     */
    Message: string;

    /**
     * stores the stack trace
     */
    StackTrace: string;

    /**
     * stores the source of error
     */
    Source: string;

    /**
     * stores the inner exception
     */
    InnerException: ExceptionModel;
}