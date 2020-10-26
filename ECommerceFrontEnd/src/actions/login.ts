import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { loginApi } from '../rest-api/login-api';

export const loginUser = (request) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await loginApi.login(request);
        if (result.Error) {
            const errorMessage = result.Error.Message ? result.Error.Message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}