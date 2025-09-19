import axios, { type AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const fetcher = async <T>(path: string) => {
  const { data } = await axiosInstance.get<T>(path);

  return data;
};

export const poster = async <D = any, R = any>(
  path: string,
  data?: D
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.post<R, AxiosResponse<R>, D>(path, data);
};

export const patcher = async <D = any, R = any>(
  path: string,
  data?: D
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.patch(path, data);
};

export const putter = async <D = any, R = any>(
  path: string,
  data?: D
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.put(path, data);
};

export const deleter = async <_D = any, R = any>(
  path: string
): Promise<AxiosResponse<R>> => {
  return await axiosInstance.delete(path);
};
