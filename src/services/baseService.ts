"use server";
import axios, { AxiosResponse } from "axios";
import ENV from "@/config/env";

export interface ResponseData<T> {
  data: T | null
  success: boolean
}

export const http =  axios.create({
  baseURL: ENV.baseApiUrl,
  timeout: 30000
});

export const fetchPaginatedResources = async <T>(uri: string, page: number, pageSize: number): Promise<ResponseData<T[]>> => {
  let responseData: ResponseData<T[]>;

  try {
    const queryParams = `page=${page || 0}&pageSize=${pageSize || 10}`;
    const response = await http.get(`${uri}?${queryParams}`) as AxiosResponse<{ data: T[] }>;

    responseData = {
      data: response.data.data,
      success: true
    };
  } catch (error: any) {
    console.error(`ERROR fetching paginated data. page: ${page} - pageSize: ${pageSize}`, error.message, error.stack);

    responseData = {
      data: [],
      success: false
    };
  }

  return responseData;
};

export const fetchById = async <T>(uri: string): Promise<ResponseData<T>> => {
  let responseData: ResponseData<T>;

  try {
    const response = await http.get(uri) as AxiosResponse<T>;

    responseData = {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.error(`ERROR fetching a resource by id. uri: ${uri}`, error);

    responseData = {
      data: null,
      success: false
    };
  }

  return responseData;
};

export const create = async <T>(uri: string, data: T): Promise<ResponseData<T>> => {
  let responseData: ResponseData<T>;

  try {
    const response = await http.post(uri, data) as AxiosResponse<T>;

    responseData = {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.error(`ERROR creating a new resource. uri: ${uri}: data:`, data,  error);

    responseData = {
      data: null,
      success: false
    };
  }

  return responseData;
};

export const update = async <T>(uri: string, data: T): Promise<ResponseData<T>> => {
  let responseData: ResponseData<T>;

  try {
    const response = await http.put(uri, data) as AxiosResponse<T>;

    responseData = {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.error(`ERROR updating a new resource. uri: ${uri}: data:`, data,  error);

    responseData = {
      data: null,
      success: false
    };
  }

  return responseData;
};

export const deleteById = async <T>(uri: string): Promise<ResponseData<T>> => {
  let responseData: ResponseData<T>;

  try {
    const response = await http.delete(uri) as AxiosResponse<T>;

    responseData = {
      data: null,
      success: true
    };
  } catch (error) {
    console.error(`ERROR deleting a resource. uri: ${uri}:`, error);

    responseData = {
      data: null,
      success: false
    };
  }

  return responseData;
};
