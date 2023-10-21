import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '../constants/Api';
import { getDeviceId } from '../storage/device';
import DeviceInfo from 'react-native-device-info';

export const config = (token?: string) => {
    return {
        headers: {
            Accept: 'Application/json',
            Authorization: `Bearer ${token}`
        }
    }
}

class Api {
    protected deviceId = '';
    protected appVersion = '';
    
    constructor() {
        this.setDeviceId();
        this.setAppVersion();
    }

    public get(url: string, token?: string) {
        const filteredUrl = this.filterUrl(url);
        const finalUrl = this.prepareFinalUrl(filteredUrl);

        return new Promise(function (resolve, reject) {
            axios.get(`${API_URL}/${finalUrl}`, config(token))
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    public post(url: string, data?: any, token?: string) {
        const filteredUrl = this.filterUrl(url);
        const finalData = {
            ...data,
            deviceId: this.deviceId,
            appVersion: this.appVersion,
        }

        return new Promise(function (resolve, reject) {
            axios.post(`${API_URL}/${filteredUrl}`, finalData, config(token))
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    public delete(url: string, token?: string) {
        const filteredUrl = this.filterUrl(url);
        const finalUrl = this.prepareFinalUrl(filteredUrl);

        return new Promise(function (resolve, reject) {
            axios.delete(`${API_URL}/${finalUrl}`, config(token))
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    public patch(url: string, data?: any, token?: string) {
        const filteredUrl = this.filterUrl(url);
        const finalData = {
            ...data,
            deviceId: this.deviceId,
            appVersion: this.appVersion,
        }

        return new Promise(function (resolve, reject) {
            axios.patch(`${API_URL}/${filteredUrl}`, finalData, config(token))
            .then((res: AxiosResponse) => {
                resolve(res.data);
            })
            .catch((e: AxiosError) => {
                reject(e);
            });
        });
    }

    protected filterUrl(url: string) {
        return url[0] === '/' ? url.substring(1) : url;
    }

    protected async setDeviceId() {
        this.deviceId = await getDeviceId();
    }

    protected setAppVersion() {
        this.appVersion = DeviceInfo.getVersion();
    }

    protected prepareFinalUrl(url: string) {
        return url + (url.includes('?') ? '&' : '?') + 'deviceId=' + this.deviceId + '&appVersion=' + this.appVersion;
    }
}

const api = new Api();

export type ApiError = AxiosError;
export type ApiResponse = any;

export default api;
