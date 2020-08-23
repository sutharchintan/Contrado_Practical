namespace ECommerceModels.Product
{
    /// <summary>
    /// class to define model properties for product
    /// </summary>
    public class Product
    {
        /// <summary>
        /// defines the product id
        /// </summary>
        public long ProductId { get; set; }

        /// <summary>
        /// defines the product category id
        /// </summary>
        public int ProdCatId { get; set; }

        /// <summary>
        /// defines the product name
        /// </summary>
        public string ProdName { get; set; }

        /// <summary>
        /// defines the product description
        /// </summary>
        public string ProdDescription { get; set; }
    }
}
