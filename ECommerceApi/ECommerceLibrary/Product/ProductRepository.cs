using ECommerceLibrary.Database;
using ECommerceModels;
using ECommerceModels.Product;
using System.Collections.Generic;
using System.Linq;

namespace ECommerceLibrary.Product
{
    /// <summary>
    /// class for product repository
    /// </summary>
    public class ProductRepository : BaseRepository
    {
        #region "Products"

        /// <summary>
        /// initialize the product repository
        /// </summary>
        /// <param name="databaseService">the database service</param>
        public ProductRepository(IDatabaseService databaseService) : base(databaseService)
        {
        }

        /// <summary>
        /// add product to database
        /// </summary>
        /// <param name="model">the product model</param>
        public void AddProduct(ECommerceModels.Product.Product model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductConstants.Add,
                     new
                     {
                         @ProdName = model.ProdName,
                         @ProdDescription = model.ProdDescription,
                         @ProdCatId = model.ProdCatId
                     });
        }

        /// <summary>
        /// update product to database
        /// </summary>
        /// <param name="model">the product model</param>
        public void UpdateProduct(ECommerceModels.Product.Product model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductConstants.Update,
                     new
                     {
                         @ProductId = model.ProductId,
                         @ProdName = model.ProdName,
                         @ProdDescription = model.ProdDescription,
                         @ProdCatId = model.ProdCatId
                     });
        }

        /// <summary>
        /// delete product
        /// </summary>
        /// <param name="productId">the product id</param>
        public void DeleteProduct(long productId)
        {
            this.databaseService.RecordAddUpdateDelete(ProductConstants.Delete, new { @ProductId = productId });
        }

        /// <summary>
        /// get products
        /// </summary>
        /// <param name="pageNumber">the page number</param>
        /// <param name="pageSize">the page size</param>
        /// <returns>the list of product model</returns>
        public List<ECommerceModels.Product.Product> GetProducts(int pageNumber, int pageSize)
        {
            return this.databaseService.RecordList<ECommerceModels.Product.Product>(ProductConstants.List,
                new
                {
                    @PageNumber = pageNumber,
                    @PageSize = pageSize
                });
        }

        /// <summary>
        /// get count for product
        /// </summary>
        /// <returns>the number of record count</returns>
        public long ProductCount()
        {
            var counts = this.databaseService.ExecuteStoreProcedure<long>(ProductConstants.Count, null);
            return counts.FirstOrDefault();
        }

        /// <summary>
        /// get product dropdown
        /// </summary>
        /// <returns>the list of product dropdown model</returns>
        public List<DropDownModel> ProductDropDown()
        {
            return this.databaseService.RecordList<DropDownModel>(ProductConstants.DropDown, null);
        }

        #endregion

        #region "Product Category"

        /// <summary>
        /// add product category to database
        /// </summary>
        /// <param name="model">the product category model</param>
        public void AddProductCategory(ProductCategory model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductCategoryConstants.Add,
                     new
                     {
                         @CategoryName = model.CategoryName
                     });
        }

        /// <summary>
        /// update product category to database
        /// </summary>
        /// <param name="model">the product category model</param>
        public void UpdateProductCategory(ProductCategory model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductCategoryConstants.Update,
                     new
                     {
                         @ProdCatId = model.ProdCatId,
                         @CategoryName = model.CategoryName
                     });
        }

        /// <summary>
        /// delete product category
        /// </summary>
        /// <param name="productId">the product id</param>
        public void DeleteProductCategory(long id)
        {
            this.databaseService.RecordAddUpdateDelete(ProductCategoryConstants.Delete, new { @ProdCatId = id });
        }

        /// <summary>
        /// get product categories
        /// </summary>
        /// <param name="pageNumber">the page number</param>
        /// <param name="pageSize">the page size</param>
        /// <returns>the list of product category model</returns>
        public List<ProductCategory> GetProductCategories(int pageNumber, int pageSize)
        {
            return this.databaseService.RecordList<ProductCategory>(ProductCategoryConstants.List,
                new
                {
                    @PageNumber = pageNumber,
                    @PageSize = pageSize
                });
        }

        /// <summary>
        /// get count for product category
        /// </summary>
        /// <returns>the number of record count</returns>
        public long ProductCategoryCount()
        {
            var counts = this.databaseService.ExecuteStoreProcedure<long>(ProductCategoryConstants.Count, null);
            return counts.FirstOrDefault();
        }

        /// <summary>
        /// get product category dropdown
        /// </summary>
        /// <returns>the list of product category dropdown model</returns>
        public List<DropDownModel> ProductCategoryDropDown()
        {
            return this.databaseService.RecordList<DropDownModel>(ProductCategoryConstants.DropDown, null);
        }

        #endregion

        #region "Product Attribute"

        /// <summary>
        /// add product attribute to database
        /// </summary>
        /// <param name="model">the product attribute model</param>
        public void AddProductAttribute(ProductAttribute model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductAttributeConstants.Add,
                     new
                     {
                         @ProductId = model.ProductId,
                         @AttributeId = model.AttributeId,
                         @AttributeValue = model.AttributeValue
                     });
        }

        /// <summary>
        /// delete product attribute
        /// </summary>
        /// <param name="productId">the product attribute id</param>
        public void DeleteProductAttribute(long id)
        {
            this.databaseService.RecordAddUpdateDelete(ProductAttributeConstants.Delete, new { @ProductId = id });
        }

        /// <summary>
        /// get product attributes
        /// </summary>
        /// <param name="pageNumber">the page number</param>
        /// <param name="pageSize">the page size</param>
        /// <returns>the list of product attribute model</returns>
        public List<ProductAttribute> GetProductAttributes(int pageNumber, int pageSize)
        {
            return this.databaseService.RecordList<ProductAttribute>(ProductAttributeConstants.List,
                new
                {
                    @PageNumber = pageNumber,
                    @PageSize = pageSize
                });
        }

        /// <summary>
        /// get count for product attribute
        /// </summary>
        /// <returns>the number of record count</returns>
        public long ProductAttributeCount()
        {
            var counts = this.databaseService.ExecuteStoreProcedure<long>(ProductAttributeConstants.Count, null);
            return counts.FirstOrDefault();
        }

        #endregion

        #region "Product Attribute Lookup"

        /// <summary>
        /// add product attribute lookup to database
        /// </summary>
        /// <param name="model">the product attribute lookup model</param>
        public void AddProductAttrLookup(ProductAttributeLookup model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductAttributeLookupConstants.Add,
                     new
                     {
                         @ProdCatId = model.ProdCatId,
                         @AttributeName = model.AttributeName
                     });
        }

        /// <summary>
        /// update product attribute lookup to database
        /// </summary>
        /// <param name="model">the product attribute lookup model</param>
        public void UpdateProductAttrLookup(ProductAttributeLookup model)
        {
            this.databaseService.RecordAddUpdateDelete(ProductAttributeLookupConstants.Update,
                     new
                     {
                         @AttributeId = model.AttributeId,
                         @ProdCatId = model.ProdCatId,
                         @AttributeName = model.AttributeName
                     });
        }

        /// <summary>
        /// delete product attribute lookup
        /// </summary>
        /// <param name="productId">the product attribute lookup id</param>
        public void DeleteProductAttrLookup(long id)
        {
            this.databaseService.RecordAddUpdateDelete(ProductAttributeLookupConstants.Delete, new { @AttributeId = id });
        }

        /// <summary>
        /// get product attribute lookup
        /// </summary>
        /// <param name="pageNumber">the page number</param>
        /// <param name="pageSize">the page size</param>
        /// <returns>the list of product attribute lookup model</returns>
        public List<ProductAttributeLookup> GetProductAttrLookups(int pageNumber, int pageSize)
        {
            return this.databaseService.RecordList<ProductAttributeLookup>(ProductAttributeLookupConstants.List,
                new
                {
                    @PageNumber = pageNumber,
                    @PageSize = pageSize
                });
        }

        /// <summary>
        /// get count for product attribute lookup
        /// </summary>
        /// <returns>the number of record count</returns>
        public long ProductAttrLookupCount()
        {
            var counts = this.databaseService.ExecuteStoreProcedure<long>(ProductAttributeLookupConstants.Count, null);
            return counts.FirstOrDefault();
        }

        #endregion
    }
}
