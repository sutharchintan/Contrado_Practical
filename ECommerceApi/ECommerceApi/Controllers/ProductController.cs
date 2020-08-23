using ECommerceApi.Models;
using ECommerceLibrary;
using ECommerceLibrary.Database;
using ECommerceLibrary.Product;
using ECommerceModels;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECommerceApi.Controllers
{
    /// <summary>
    /// class for product controller
    /// </summary>
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductController : ApiController
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
        /// product cotnroller constructor instance
        /// </summary>
        /// <param name="productRepository">the product repository</param>
        /// <param name="logger">the logger</param>
        public ProductController(ProductRepository productRepository, ILogger logger)
        {
            this.productRepository = productRepository;
            this.logger = logger;
        }

        /// <summary>
        /// get products using paging
        /// </summary>
        /// <param name="request">the list request</param>
        /// <returns>the list of product models</returns>
        [HttpPost]
        public ApiResult<ListResponse<ECommerceModels.Product.Product>> GetProducts(ListRequest<ECommerceModels.Product.Product> request)
        {
            try
            {
                var result = this.productRepository.GetProducts(request.PageNumber, request.PageSize);
                var count = this.productRepository.ProductCount();
                return ApiResult<ListResponse<ECommerceModels.Product.Product>>
                    .Success(new ListResponse<ECommerceModels.Product.Product>() { Items = result, Count = count });
            }
            catch (Exception exception)
            {
                return ApiResult<ListResponse<ECommerceModels.Product.Product>>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// add the product model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Add(ECommerceModels.Product.Product model)
        {
            try
            {
                this.productRepository.AddProduct(model);
                return ApiResult<string>.Success(RecordConstants.Add);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// update the product record
        /// </summary>
        /// <param name="model">the product model</param>
        /// <returns>the response where record is updated or not</returns>
        [HttpPost]
        public ApiResult<string> Update(ECommerceModels.Product.Product model)
        {
            try
            {
                this.productRepository.UpdateProduct(model);
                return ApiResult<string>.Success(RecordConstants.Update);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// delete the product record
        /// </summary>
        /// <param name="request">the delete record request</param>
        /// <returns>the response of delete record or exception</returns>
        [HttpPost]

        public ApiResult<string> Delete(DeleteRequest request)
        {
            try
            {
                this.productRepository.DeleteProduct(request.RecordId);
                return ApiResult<string>.Success(RecordConstants.Delete);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// get the drop down list of product 
        /// </summary>
        /// <returns>the api result of drop down models</returns>
        [HttpGet]
        public ApiResult<List<DropDownModel>> GetProductDropDown()
        {
            try
            {
                var result = this.productRepository.ProductDropDown();
                return ApiResult<List<DropDownModel>>.Success(result);
            }
            catch (Exception exception)
            {
                return ApiResult<List<DropDownModel>>.Exception(this.logger.LogException(exception));
            }
        }
    }
}
