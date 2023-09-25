import axios, { AxiosInstance } from "axios";
import { HTTPLib, HTTPRequestOptions } from "./api.service";

interface HTTPInitOptions {
    baseURL: string,
    timeout: number,
    headers: object
}

class AxiosImplementation implements HTTPLib {
    private static _singleton: AxiosImplementation | null = null;

    public static get singleton() {
        if (!AxiosImplementation._singleton)
            throw new Error('Singleton instance not initialized. Call setSingleton() first.');

        return AxiosImplementation._singleton;
    }

    private instance: AxiosInstance;

    private constructor(newInstance: AxiosInstance) {
        this.instance = newInstance;
    }

    public request<T>(options: HTTPRequestOptions) {
        return this.instance.request<HTTPRequestOptions, T>(options);
    }

    public static setSingleton(options: HTTPInitOptions) {
        if (!AxiosImplementation._singleton)
            AxiosImplementation._singleton = new AxiosImplementation(axios.create(options));
    }
}

export default AxiosImplementation;