using ECommerceModels.Exception;
using System;

namespace ECommerceLibrary
{
    /// <summary>
    /// logger for exception and information handling
    /// </summary>
    public interface ILogger
    {
        /// <summary>
        /// log exception
        /// </summary>
        /// <param name="exception">the exception</param>
        /// <returns>the exception model</returns>
        ExceptionModel LogException(Exception exception);
    }
}
