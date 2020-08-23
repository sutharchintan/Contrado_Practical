import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productApi } from '../rest-api/product-api';

export const getProducts = (request) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productApi.getProducts(request);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}