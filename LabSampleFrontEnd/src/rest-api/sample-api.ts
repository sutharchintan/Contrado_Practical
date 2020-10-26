import { ApiRoutes } from '../config/api-routes';
import { BaseApi } from './base-api';

class SampleApi extends BaseApi {

    public getSamples(request: any) {
        return this.postData(ApiRoutes.LabSample + "GetSamples", request);
    }

    public viewSamples(request: any) {
        return this.postData(ApiRoutes.LabSample + "ViewSamples", request);
    }

    public addSample(model: any) {
        return this.postData(ApiRoutes.LabSample + "Add", model);
    }

    public updateSample(model: any) {
        return this.postData(ApiRoutes.LabSample + "Update", model);
    }
}

export const sampleApi = new SampleApi();

