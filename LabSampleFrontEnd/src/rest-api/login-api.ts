import { BaseApi } from "./base-api";
import { ApiRoutes } from '../config/api-routes';

class LoginApi extends BaseApi {
    public login(request: any) {
        return this.postData(ApiRoutes.Login + "Login", request)
    }

    public logout() {
        return this.postData(ApiRoutes.Login + "Logout", {})
    }
}


export const loginApi = new LoginApi();
