using ECommerceModels.Exception;

namespace ECommerceApi.Models
{
    /// <summary>
    /// the api result using extending action result
    /// </summary>
    /// <typeparam name="T">the dynamic object which will return</typeparam>
    public class ApiResult<T>
    {
        /// <summary>
        /// the api result data
        /// </summary>
        public T Data { get; set; }

        /// <summary>
        /// indicates whether the api action is succeed or not
        /// </summary>
        public bool IsSuccess { get; set; }

        /// <summary>
        /// stores the exception occured during api action execution
        /// </summary>
        public ExceptionModel Error { get; set; }

        /// <summary>
        /// the success api result
        /// </summary>
        /// <param name="data">the api result data</param>
        /// <returns>the api result</returns>
        public static ApiResult<T> Success(T data)
        {
            var returnValue = new ApiResult<T>();
            returnValue.Data = data;
            returnValue.IsSuccess = true;
            return returnValue;
        }

        /// <summary>
        /// the exception result
        /// </summary>
        /// <param name="model">the exception model</param>
        /// <returns>the api exception</returns>
        public static ApiResult<T> Exception(ExceptionModel model)
        {
            var returnValue = new ApiResult<T>();
            returnValue.Error = model;
            returnValue.IsSuccess = false;
            return returnValue;
        }
    }
}