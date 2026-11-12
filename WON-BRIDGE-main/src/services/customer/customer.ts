import api from "../api";
import type {
  LoginVals,
  RegisterCustomer,
  CustomerResponse
} from "./customer-interfaces"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/customer";

export const login = (data: LoginVals) => {
  api.post(`${url}/login`, data);
};

export const createCustomer = (data: RegisterCustomer) => {
  return api.post<ApiResponse<CustomerResponse>>(`${url}`, data);
};

export const getCustomerList = (params?: Record<string, any>) => {
  return api.get<ApiResponse<CustomerResponse[]>>(`${url}`, { params });
};

export const getCustomerById = (id: string) => {
  return api.get<ApiResponse<CustomerResponse>>(`${url}/${id}`);
};

export const updateCustomer = (id: string, data: Partial<RegisterCustomer>) => {
  return api.patch<ApiResponse<CustomerResponse>>(`${url}/${id}`, data);
};

export const downloadCustomerTemp = async (): Promise<Blob> => {
  const response = await api.get(`${url}/download-excel/temp`, {
    responseType: "blob"
  });

  return new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
};

export const importCustomerExcelFile = ( data: any) => {
  return api.post<ApiResponse>(`${url}/bulk-upload/excel`, data);
};