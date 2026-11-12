import api from "../api";
import type {
  LoginVals,
  RegisterSupplier,
  SupplierResponse
} from "./supplier-interfaces"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/supplier";

export const login = (data: LoginVals) => {
  api.post(`${url}/login`, data);
};

export const createSupplier = (data: RegisterSupplier) => {
  return api.post<ApiResponse<SupplierResponse>>(`${url}`, data);
};

export const getSupplierList = (params?: Record<string, any>) => {
  return api.get<ApiResponse<SupplierResponse[]>>(`${url}`, { params });
};

export const getSupplierById = (id: string) => {
  return api.get<ApiResponse<SupplierResponse>>(`${url}/${id}`);
};

export const updateSupplier = (id: string, data: Partial<RegisterSupplier>) => {
  return api.patch<ApiResponse<SupplierResponse>>(`${url}/${id}`, data);
};

export const downloadTemp = async (): Promise<Blob> => {
  const response = await api.get(`${url}/download-excel/temp`, {
    responseType: "blob"
  });

  return new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
};

export const importSupplierExcelFile = ( data: any) => {
  return api.post<ApiResponse>(`${url}/bulk-upload/excel`, data);
};