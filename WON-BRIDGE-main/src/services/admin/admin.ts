import api from "../api";
import type {
  LoginVals,
  registerAdmin,
  AdminResponse
} from "./admin-interfaces"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/admins";

export const login = (data: LoginVals) => {
  api.post(`${url}/login`, data);
};

export const register = (data: registerAdmin) => {
  return api.post<ApiResponse<AdminResponse>>(`${url}/register`, data);
};

export const getAdminsList = (params?: Record<string, any>) => {
  return api.get<ApiResponse>(`${url}`, { params });
};

export const getAdminById = (id: string) => {
  return api.get<ApiResponse<AdminResponse>>(`${url}/${id}`);
};

export const updateAdminById = (id: string, data: Partial<registerAdmin>) => {
  return api.patch<ApiResponse<AdminResponse>>(`${url}/${id}`, data);
};

export const getAdminAsOptions = async (params?: Record<string, any>) => {
  const response = await api.get<ApiResponse<AdminResponse[]>>(
    `${url}/dropdown/options`,
    { params }
  );

  const options =
    response.data?.data?.map((admin) => ({
      value: admin._id,
      label: `${admin.company_name} (${admin.custom_id})`
    })) ?? [];

  console.log(options,'adminooopoppp');

  return options;
};

export const updateNotifyStatus = async (id: string, data: any) => {
  return api.patch<ApiResponse<AdminResponse>>(
    `${url}/notify-status/${id}`,
    data
  );
};

export const getSettingsData = async (id: string) => {
  return api.get<ApiResponse<AdminResponse>>(`${url}/settings/${id}`);
};

export const saveThresholdLimit = async (id: string, data: any) => {
  return api.patch<ApiResponse<AdminResponse>>(
    `${url}/threshold-limit/${id}`,
    data
  );
};

export const savePrinterMeta = async (id: string, data: any) => {
  return api.patch<ApiResponse<AdminResponse>>(
    `${url}/printer-meta/${id}`,
    data
  );
};

export const updateBackupSchedule = async (id: string, data: any) => {
  return api.patch<ApiResponse<AdminResponse>>(
    `${url}/back-up/schedule/${id}`,
    data
  );
};

export const downloadTemp = async () => {
  try {
    const response = await api.post(`${url}`, null, {
      responseType: "blob" // for file download
    });

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const urlObj = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = urlObj;
    link.setAttribute("download", "admin_template.xlsx");
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(urlObj);
  } catch (error) {
    console.error("Error downloading template:", error);
  }
};

export const bulkImport = async (data: any) => {
  return api.post<ApiResponse>(`${url}/`, data);
};
