﻿using ECommerceApi.Models;
using ECommerceLibrary;
using ECommerceLibrary.Database;
using ECommerceLibrary.LabSample;
using ECommerceModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ECommerceApi.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LabSampleController : ApiController
    {
        private readonly LabSampleRepository labSampleRepository;
        private readonly ILogger logger;

        public LabSampleController(LabSampleRepository labSampleRepository, ILogger logger)
        {
            this.labSampleRepository = labSampleRepository;
            this.logger = logger;
        }

        /// <summary>
        /// get labsample
        /// </summary>
        /// <param name="request">the list request</param>
        /// <returns>the list of labsample models</returns>
        [HttpPost]
        public ApiResult<ListResponse<ECommerceModels.LabSample.LabSample>> GetProducts(int userId, string roleName)
        {
            try
            {
                var result = this.labSampleRepository.GetLabSample(userId, roleName);
                return ApiResult<ListResponse<ECommerceModels.LabSample.LabSample>>
                    .Success(new ListResponse<ECommerceModels.LabSample.LabSample>() { Items = result, Count = result.Count });
            }
            catch (Exception exception)
            {
                return ApiResult<ListResponse<ECommerceModels.LabSample.LabSample>>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// add the labsample model
        /// </summary>
        /// <param name="model">the labsample model</param>
        /// <returns>the response where record is added or exception</returns>
        [HttpPost]
        public ApiResult<string> Add(ECommerceModels.LabSample.LabSample model)
        {
            try
            {
                this.labSampleRepository.AddLabSample(model);
                return ApiResult<string>.Success(RecordConstants.Add);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }

        /// <summary>
        /// update the labsample record
        /// </summary>
        /// <param name="model">the labsample model</param>
        /// <returns>the response where record is updated or not</returns>
        [HttpPost]
        public ApiResult<string> Update(ECommerceModels.LabSample.LabSample model)
        {
            try
            {
                this.labSampleRepository.UppdateLabSample(model);
                return ApiResult<string>.Success(RecordConstants.Update);
            }
            catch (Exception exception)
            {
                return ApiResult<string>.Exception(this.logger.LogException(exception));
            }
        }
    }
}