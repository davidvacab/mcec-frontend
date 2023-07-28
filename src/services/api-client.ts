import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

class APIClient<TResponse = unknown, TRequest = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig<TRequest>) => {
    const res = await axiosInstance.get<FetchResponse<TResponse>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  getID = async (id: string | number, config: AxiosRequestConfig<TRequest>) => {
    const res = await axiosInstance.get<TResponse>(
      this.endpoint + "/" + id + "/",
      config
    );
    return res.data;
  };

  get = async (config: AxiosRequestConfig<TRequest>) => {
    const res = await axiosInstance.get<TResponse>(this.endpoint, config);
    return res.data;
  };

  post = async (config: AxiosRequestConfig<TRequest> | unknown) => {
    const res = await axiosInstance.post<TResponse>(this.endpoint, config);
    return res;
  };

  postID = async (
    id: string | number,
    config: AxiosRequestConfig<TRequest> | unknown
  ) => {
    const res = await axiosInstance.post<TResponse>(
      this.endpoint + "/" + id + "/",
      config
    );
    return res;
  };
}

export default APIClient;
