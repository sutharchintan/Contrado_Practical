using System.Collections.Generic;

namespace ECommerceModels
{
    /// <summary>
    /// class for list response
    /// </summary>
    /// <typeparam name="T">the dynamic model</typeparam>
    public class ListResponse<T>
    {
        /// <summary>
        /// the list of items
        /// </summary>
        public List<T> Items { get; set; }

        /// <summary>
        /// the number of record count
        /// </summary>
        public long Count { get; set; }
    }
}
