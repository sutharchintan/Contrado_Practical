import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { productApi } from '../rest-api/product-api';

export const deleteProduct = (id: number) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await productApi.delete(id);
        if (result.Error) {
            const errorMessage = result.Error.message ? result.Error.message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}