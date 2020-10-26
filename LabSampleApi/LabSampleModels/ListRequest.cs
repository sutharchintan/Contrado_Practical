namespace ECommerceModels
{
    /// <summary>
    /// class for list request
    /// </summary>
    /// <typeparam name="T">the model which needs to be filtered</typeparam>
    public class ListRequest<T>
    {
        /// <summary>
        /// stores the page number
        /// </summary>
        public int PageNumber { get; set; }

        /// <summary>
        /// stores the page size
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        /// stores the sort direction
        /// </summary>
        public string SortingDirection { get; set; }

        /// <summary>
        /// stores the sort field
        /// </summary>
        public string SortingField { get; set; }

        /// <summary>
        /// stores the filter model
        /// </summary>
        public T FilterModel { get; set; }
    }
}
