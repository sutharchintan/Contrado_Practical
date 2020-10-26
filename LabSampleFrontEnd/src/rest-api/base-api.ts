import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiResult } from '../models';
import { DeleteRequest } from '../models/delete-request';

export class BaseApi {

    /**
     * get data by token
     * @param url the url to get data
     */
    protected getData(urlToGetData: string): Promise<any> {
        return this.resolveApiCall(axios.get(urlToGetData, this.getRequestConfiguration()));
    }

    /**
     * post data by token
     * @param urlToPostData the url to post data 
     * @param data the data to be fetched on server as body
     */
    protected postData(urlToPostData: string, data: any): Promise<any> {
        return this.resolveApiCall(axios.post(urlToPostData, data, this.getRequestConfiguration()));
    }

    /**
     * put data by token
     * @param urlToPostData the url to post data 
     * @param data the data to be fetched on server as body
     */
    protected putData(urlToPutData: string, data: any): Promise<any> {
        return this.resolveApiCall(axios.put(urlToPutData, data, this.getRequestConfiguration()));
    }

    /**
     * delete data by token
     * @param urlToDeleteData the url to delete data 
     */
    protected deleteData(urlToDeleteData: string): Promise<any> {
        return this.resolveApiCall(axios.delete(urlToDeleteData, this.getRequestConfiguration()));
    }

    /**
     * get delete request
     * @param id 
     */
    protected deleteRequest(id: number): DeleteRequest {
        return { RecordId: id } as DeleteRequest;
    }

    /**
     * resolve api call
     * @param apiCall 
     */
    private resolveApiCall(apiCall: Promise<AxiosResponse<any>>): Promise<any> {
        return new Promise<any>((resolve) => {
            apiCall.then(response => {              
                resolve(response && response.data ? response.data : undefined);
            }).catch(error => {
                const apiResult = new ApiResult<any>();
                apiResult.Error = error;
                resolve(apiResult);
            });
        });
    }

    /**
     * get request configuration
     */
    private getRequestConfiguration(): AxiosRequestConfig {
        const axiosRequestConfig = {} as AxiosRequestConfig;
        axiosRequestConfig.headers = {
            'Content-Type': "application/json",
        };

        return axiosRequestConfig;
    }
}