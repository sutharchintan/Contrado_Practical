import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productApi } from '../rest-api/product-api';
import { ProductModel } from '../models';

export const updateProduct = (model: ProductModel) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productApi.update(model);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}