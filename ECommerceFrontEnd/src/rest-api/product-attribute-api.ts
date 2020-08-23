import { BaseApi } from "./base-api";
import { ListRequest, ProductAttribute } from "../models";
import { ApiRoutes } from '../config/api-routes';

class ProductAttributeApi extends BaseApi {

    async getProducts(request: ListRequest<any>) {
        return this.postData(ApiRoutes.ProductAttribute + "GetProductAttribute", request);
    }

    async add(model: ProductAttribute) {
        return this.postData(ApiRoutes.ProductAttribute + "Add", model);
    }

    async delete(id: number) {
        return this.postData(ApiRoutes.ProductAttribute + "Delete", this.deleteRequest(id));
    }
}

export const productAttributeApi = new ProductAttributeApi();
