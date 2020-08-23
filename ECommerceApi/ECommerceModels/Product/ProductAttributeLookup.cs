namespace ECommerceModels.Product
{
    /// <summary>
    /// class to define model properties for product attribute lookup
    /// </summary>
    public class ProductAttributeLookup
    {
        /// <summary>
        /// defines the property for attribute id
        /// </summary>
        public int AttributeId { get; set; }

        /// <summary>
        /// defines the property for the product category id
        /// </summary>
        public int ProdCatId { get; set; }

        /// <summary>
        /// defines the attribute name
        /// </summary>
        public string AttributeName { get; set; }
    }
}
