"use server";
import axios, { AxiosResponse } from "axios";
import ENV from "@/config/env";
import { Student } from "@/models/student.model";

export interface ResponseData<T> {
  data: T | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  totalItems: number
}

export const http =  axios.create({
  baseURL: ENV.baseApiUrl,
  timeout: 30000
});

export const fetchPaginatedResources = async <T>(uri: string, page: number, pageSize: number): Promise<ResponseData<PaginatedResponse<T>>> => {
  let responseData: ResponseData<PaginatedResponse<T>>;

  try {
    const queryParams = `page=${page || 0}&pageSize=${pageSize || 10}`;
    const response = await http.get(`${uri}?${queryParams}`) as AxiosResponse<PaginatedResponse<T>>;

    responseData = {
      data: response.data,
      success: true
    };
  } catch (error: any) {
    console.error(`ERROR fetching paginated data. page: ${page} - pageSize: ${pageSize}`, error.message, error.stack);

    responseData = {
      data: {
        data: [],
        page: 1,
        totalItems: 0
      },
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
