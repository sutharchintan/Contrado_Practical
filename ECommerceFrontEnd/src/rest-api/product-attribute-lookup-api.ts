import { BaseApi } from "./base-api";
import { ListRequest, ProductAttributeLookup } from "../models";
import { ApiRoutes } from '../config/api-routes';

class ProductAttrLookupApi extends BaseApi {

    async getList(request: ListRequest<any>) {
        return this.postData(ApiRoutes.ProductAttributeLookup + "GetProductAttrLookup", request);
    }

    async add(model: ProductAttributeLookup) {
        return this.postData(ApiRoutes.ProductAttributeLookup + "Add", model);
    }

    async update(model: ProductAttributeLookup) {
        return this.postData(ApiRoutes.ProductAttributeLookup + "Update", model);
    }

    async delete(id: number) {
        return this.postData(ApiRoutes.ProductAttributeLookup + "Delete", this.deleteRequest(id));
    }
}

export const productAttrLookupApi = new ProductAttrLookupApi();
