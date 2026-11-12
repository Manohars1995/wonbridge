import api from "../api";
import type {
  LoginVals,
  RegisterStaff,
  StaffResponse
} from "./staff-interfaces"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/staff";

export const login = (data: LoginVals) => {
  api.post(`${url}/login`, data);
};

export const createStaff = (data: RegisterStaff, userID: string) => {
  return api.post<ApiResponse<StaffResponse>>(`${url}/${userID}`, data);
};

export const getStaffList = (params?: Record<string, any>) => {
  return api.get<ApiResponse<StaffResponse[]>>(`${url}`, { params });
};

export const getStaffById = (id: string) => {
  return api.get<ApiResponse<StaffResponse>>(`${url}/${id}`);
};

export const updateStaffById = (id: string, data: Partial<RegisterStaff>) => {
  return api.patch<ApiResponse<StaffResponse>>(`${url}/${id}`, data);
};

export const downloadTemp = async (): Promise<Blob> => {
  const response = await api.get(`${url}/download-excel/temp`, {
    responseType: "blob"
  });

  return new Blob([response.data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
};

export const importStaffExcelFile = ( data: any) => {
  return api.post<ApiResponse>(`${url}/bulk-upload/excel`, data);
};
