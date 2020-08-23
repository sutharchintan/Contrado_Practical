import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productCategoryApi } from '../rest-api/product-category-api';

export const deleteProductCategory = (id: number) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productCategoryApi.delete(id);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}