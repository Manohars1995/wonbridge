import api from "../api";
import type {} from "./auditLogs-interface"; // interface import
import type { ApiResponse } from "@/types/api-response";
const url = "/audit";

export const getAuditLogs = (params?: Record<string, any>) => {
  return api.get<ApiResponse>(`${url}`, { params });
};
