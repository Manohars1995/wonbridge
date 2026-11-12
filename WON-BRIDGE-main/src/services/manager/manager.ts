import api from "../api";
import type {
  LoginVals,
  registerManager,
  ManagerResponse
} from "./manager-interfaces"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/managers";

export const login = (data: LoginVals) => {
  api.post(`${url}/login`, data);
};

export const createManager = (data: registerManager, userID: string) => {
  return api.post<ApiResponse<ManagerResponse>>(`${url}/${userID}`, data);
};

export const getManagersList = (params?: Record<string, any>) => {
  return api.get<ApiResponse<ManagerResponse[]>>(`${url}`, { params });
};

export const getManagerById = (id: string) => {
  return api.get<ApiResponse<ManagerResponse>>(`${url}/${id}`);
};

export const updateManagerById = (id: string, data: Partial<registerManager>) => {
  return api.patch<ApiResponse<ManagerResponse>>(`${url}/${id}`, data);
};
