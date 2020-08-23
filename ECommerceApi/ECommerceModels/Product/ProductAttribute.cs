namespace ECommerceModels.Product
{
    /// <summary>
    /// class to define model properties for product attribute
    /// </summary>
    public class ProductAttribute
    {
        /// <summary>
        /// defines the property for product id
        /// </summary>
        public long ProductId { get; set; }

        /// <summary>
        /// defines the attribute id
        /// </summary>
        public int AttributeId { get; set; }

        /// <summary>
        /// defines the attribute value
        /// </summary>
        public string AttributeValue { get; set; }
    }
}
