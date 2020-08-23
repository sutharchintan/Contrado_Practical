using ECommerceModels.Exception;
using System;

namespace ECommerceLibrary.Exceptions
{
    /// <summary>
    /// exception logger
    /// </summary>
    public class ExceptionLogger : ILogger
    {
        /// <summary>
        /// log exception and return exception model
        /// </summary>
        /// <param name="exception">the system exception</param>
        /// <returns>the exception model</returns>
        public ExceptionModel LogException(Exception exception)
        {
            var returnValue = new ExceptionModel();
            returnValue.Message = exception.Message;
            returnValue.Source = exception.Source;
            returnValue.StackTrace = exception.StackTrace;

            //while (exception.InnerException != null)
            //{
            //    returnValue.InnerException = this.LogException(exception.InnerException);
            //}

            return returnValue;
        }
    }
}
