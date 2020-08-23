using ECommerceApi.Models;
using ECommerceLibrary;
using ECommerceLibrary.Database;
using ECommerceLibrary.Product;
using ECommerceModels;
using ECommerceModels.Product;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECommerceApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class ProductAttributeLookupController : ApiController
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
        /// product attribute lookup cotnroller constructor instance
        /// </summary>
        /// <param name="productRepository">the product repository</param>
        /// <param name="logger">the logger</param>
        public ProductAttributeLookupController(ProductRepository productRepository, ILogger logger)
        {
            this.productRepository = productRepository;
            this.logger = logger;
        }

        /// <summary>
        /// get the product atribute lookup records
        /// </summary>
        /// <param name="request">the list request</param>
        /// <returns>the list of product attribute lookup</returns>
        [HttpPost]
        public ApiResult<ListResponse<ProductAttributeLookup>> GetProductAttrLookup(ListRequest<ProductAttributeLookup> request)
        {
            try
            {
                var result = this.productRepository.GetProductAttrLookups(request.PageNumber, request.PageSize);
                var count = this.productRepository.ProductAttrLookupCount();
                return ApiResult<ListResponse<ProductAttributeLookup>>
                    .Success(new ListResponse<ProductAttributeLookup>() { Items = result, Count = count });
            }
            catch (Exception exception)
            {
                return ApiResult<ListResponse<ProductAttributeLookup>>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// add the product attribute lookup model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Add(ProductAttributeLookup model)
        {
            try
            {
                this.productRepository.AddProductAttrLookup(model);
                return ApiResult<string>.Success(RecordConstants.Add);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// update the product attribute lookup model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Update(ProductAttributeLookup model)
        {
            try
            {
                this.productRepository.UpdateProductAttrLookup(model);
                return ApiResult<string>.Success(RecordConstants.Update);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// delete the product attribute lookup record
        /// </summary>
        /// <param name="request">the delete record request</param>
        /// <returns>the response of delete record or exception</returns>
        [HttpPost]
        public ApiResult<string> Delete(DeleteRequest request)
        {
            try
            {
                this.productRepository.DeleteProductAttrLookup(request.RecordId);
                return ApiResult<string>.Success(RecordConstants.Delete);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }
    }
}
