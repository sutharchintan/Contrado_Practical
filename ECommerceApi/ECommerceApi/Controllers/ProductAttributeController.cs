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

    public class ProductAttributeController : ApiController
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
        /// product attribute cotnroller constructor instance
        /// </summary>
        /// <param name="productRepository">the product repository</param>
        /// <param name="logger">the logger</param>
        public ProductAttributeController(ProductRepository productRepository, ILogger logger)
        {
            this.productRepository = productRepository;
            this.logger = logger;
        }

        /// <summary>
        /// get product attribute using paging
        /// </summary>
        /// <param name="request">the list request</param>
        /// <returns>the list of product attribute models</returns>
        [HttpPost]
        public ApiResult<ListResponse<ProductAttribute>> GetProductAttribute(ListRequest<ProductAttribute> request)
        {
            try
            {
                var result = this.productRepository.GetProductAttributes(request.PageNumber, request.PageSize);
                var count = this.productRepository.ProductAttributeCount();
                return ApiResult<ListResponse<ProductAttribute>>
                    .Success(new ListResponse<ProductAttribute>() { Items = result, Count = count });
            }
            catch (Exception exception)
            {
                return ApiResult<ListResponse<ProductAttribute>>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// add the product attribute model
        /// </summary>
        /// <param name="model">the model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Add(ProductAttribute model)
        {
            try
            {
                this.productRepository.AddProductAttribute(model);
                return ApiResult<string>.Success(RecordConstants.Add);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// delete the product atribute records using product id
        /// </summary>
        /// <param name="request">the delete record request</param>
        /// <returns>the response of delete record or exception</returns>
        [HttpPost]
        public ApiResult<string> Delete(DeleteRequest request)
        {
            try
            {
                this.productRepository.DeleteProductAttribute(request.RecordId);
                return ApiResult<string>.Success(RecordConstants.Delete);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }
    }
}
