import { BaseApi } from "./base-api";
import { ListRequest, ProductModel } from "../models";
import { ApiRoutes } from '../config/api-routes';

class ProductApi extends BaseApi {

    async getProducts(request: ListRequest<any>) {
        return this.postData(ApiRoutes.Product + "GetProducts", request);
    }

    async add(model: ProductModel) {
        return this.postData(ApiRoutes.Product + "Add", model);
    }

    async update(model: ProductModel) {
        return this.postData(ApiRoutes.Product + "Update", model);
    }

    async delete(id: number) {
        return this.postData(ApiRoutes.Product + "Delete", this.deleteRequest(id));
    }

    async dropDown() {
        return this.getData(ApiRoutes.Product + "GetProductDropDown");
    }
}

export const productApi = new ProductApi();
