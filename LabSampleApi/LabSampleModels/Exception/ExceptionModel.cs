using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceModels.Exception
{
    /// <summary>
    /// the exception model
    /// </summary>
    public class ExceptionModel
    {
        /// <summary>
        /// stores the exception id
        /// </summary>
        public long ExceptionId { get; set; }

        /// <summary>
        /// stores the message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// stores the stack trace
        /// </summary>
        public string StackTrace { get; set; }

        /// <summary>
        /// stores the source 
        /// </summary>
        public string Source { get; set; }

        /// <summary>
        /// stores the inner exception model
        /// </summary>
        public ExceptionModel InnerException { get; set; }
    }
}
