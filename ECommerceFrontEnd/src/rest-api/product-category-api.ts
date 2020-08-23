import { BaseApi } from "./base-api";
import { ListRequest, ProductCategoryModel } from "../models";
import { ApiRoutes } from '../config/api-routes';

class ProductCategoryApi extends BaseApi {

    async getProductCategories(request: ListRequest<any>) {
        return this.postData(ApiRoutes.ProductCategory + "GetProductCategories", request);
    }

    async add(model: ProductCategoryModel) {
        return this.postData(ApiRoutes.ProductCategory + "Add", model);
    }

    async update(model: ProductCategoryModel) {
        return this.postData(ApiRoutes.ProductCategory + "Update", model);
    }

    async delete(id: number) {
        return this.postData(ApiRoutes.ProductCategory + "Delete", this.deleteRequest(id));
    }

    async dropDown() {
        return this.getData(ApiRoutes.ProductCategory + "GetProductCategoryDropDown");
    }
}

export const productCategoryApi = new ProductCategoryApi();
