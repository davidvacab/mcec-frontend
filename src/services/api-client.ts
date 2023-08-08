import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "https://mcec-backend-4755c92403d9.herokuapp.com",
});

class APIClient<TResponse = unknown, TRequest = unknown> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config?: AxiosRequestConfig<TRequest>) => {
    const res = await axiosInstance.get<FetchResponse<TResponse>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  get = async (config?: AxiosRequestConfig<TRequest>, id?: string | number) => {
    let endID = "";
    if (id !== undefined) endID = `/${id}/`;
    const res = await axiosInstance.get<TResponse>(
      this.endpoint + endID,
      config
    );
    return res.data;
  };

  post = async (
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
    id?: string | number
  ) => {
    let endID = "";
    if (id !== undefined) endID = `/${id}/`;
    const res = await axiosInstance.post<TResponse>(
      this.endpoint + endID,
      data,
      config
    );
    return res;
  };

  put = async (
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
    id?: string | number
  ) => {
    let endID = "";
    if (id !== undefined) endID = `/${id}/`;
    const res = await axiosInstance.put<TResponse>(
      this.endpoint + endID,
      data,
      config
    );
    return res;
  };

  patch = async (
    data?: TRequest,
    config?: AxiosRequestConfig<TRequest>,
    id?: string | number
  ) => {
    let endID = "";
    if (id !== undefined) endID = `/${id}/`;
    const res = await axiosInstance.patch<TResponse>(
      this.endpoint + endID,
      data,
      config
    );
    return res;
  };
}

export default APIClient;
