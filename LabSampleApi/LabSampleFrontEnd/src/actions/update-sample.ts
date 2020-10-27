import { showLoading } from "./show-loading";
import { showError } from "./show-error";
import { sampleApi } from '../rest-api/sample-api';

export const updateLabSample = (model: any) => {
    return async dispatcher => {
        dispatcher(showLoading(true));
        const result = await sampleApi.updateSample(model);
        if (result.Error) {
            const errorMessage = result.Error.Message ? result.Error.Message : "";
            dispatcher(showError(errorMessage));
        }

        dispatcher(showLoading(false));
        return result.Data;
    }
}