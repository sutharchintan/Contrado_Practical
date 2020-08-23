using ECommerceApi.Models;
using ECommerceLibrary;
using ECommerceLibrary.Database;
using ECommerceLibrary.Product;
using ECommerceModels;
using ECommerceModels.Product;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECommerceApi.Controllers
{
    /// <summary>
    /// class for product category controller
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ProductCategoryController : ApiController
    {
        /// <summary>
        /// the product repository
        /// </summary>
        private readonly ProductRepository productRepository;

        /// <summary>
        /// the logger
        /// </summary>
        private readonly ILogger logger;

        /// <summary>
        /// product category cotnroller constructor instance
        /// </summary>
        /// <param name="productRepository">the product repository</param>
        /// <param name="logger">the logger</param>
        public ProductCategoryController(ProductRepository productRepository, ILogger logger)
        {
            this.productRepository = productRepository;
            this.logger = logger;
        }

        /// <summary>
        /// get the product categories
        /// </summary>
        /// <param name="request">the list request</param>
        /// <returns>the list of product categories</returns>
        [HttpPost]
        public ApiResult<ListResponse<ProductCategory>> GetProductCategories(ListRequest<ProductCategory> request)
        {
            try
            {
                var result = this.productRepository.GetProductCategories(request.PageNumber, request.PageSize);
                var count = this.productRepository.ProductCategoryCount();
                return ApiResult<ListResponse<ProductCategory>>
                    .Success(new ListResponse<ProductCategory>() { Items = result, Count = count });
            }
            catch (Exception exception)
            {
                return ApiResult<ListResponse<ProductCategory>>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// add the product category model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Add(ProductCategory model)
        {
            try
            {
                this.productRepository.AddProductCategory(model);
                return ApiResult<string>.Success(RecordConstants.Add);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// update the product category model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Update(ProductCategory model)
        {
            try
            {
                this.productRepository.UpdateProductCategory(model);
                return ApiResult<string>.Success(RecordConstants.Update);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// delete the product category record
        /// </summary>
        /// <param name="request">the delete record request</param>
        /// <returns>the response of delete record or exception</returns>
        [HttpPost]
        public ApiResult<string> Delete(DeleteRequest request)
        {
            try
            {
                this.productRepository.DeleteProductCategory(request.RecordId);
                return ApiResult<string>.Success(RecordConstants.Delete);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// get product category dropdown
        /// </summary>
        /// <returns>the api result of drop down models</returns>
        [HttpGet]
        public ApiResult<List<DropDownModel>> GetProductCategoryDropDown()
        {
            try
            {
                var result = this.productRepository.ProductCategoryDropDown();
                return ApiResult<List<DropDownModel>>.Success(result);
            }
            catch (Exception exception)
            {
                return ApiResult<List<DropDownModel>>.Exception(this.logger.LogException(exception));
            }
        }
    }
}
