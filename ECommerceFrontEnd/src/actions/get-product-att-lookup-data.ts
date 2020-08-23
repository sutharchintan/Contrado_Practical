

import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productAttrLookupApi } from '../rest-api/product-attribute-lookup-api';

export const getProductAttrLookupData = (request) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productAttrLookupApi.getList(request);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}