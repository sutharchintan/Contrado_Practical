import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { loginApi } from '../rest-api/login-api';

export const logoutUser = () => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await loginApi.logout();
        if (result.Error) {
            const errorMessage = result.Error.Message ? result.Error.Message : "";
            dispatcher(showError(errorMessage));
        }

        sessionStorage.clear();
        localStorage.clear();
        dispatcher(showLoading(false));
        return result.Data;
    }
}