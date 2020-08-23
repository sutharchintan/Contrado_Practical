import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productAttrLookupApi } from '../rest-api/product-attribute-lookup-api';
import {  ProductAttributeLookup } from '../models';

export const addProductAttrLookup = (model: ProductAttributeLookup) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productAttrLookupApi.add(model);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}