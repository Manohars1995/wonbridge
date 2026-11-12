import api from "../api";

import type { ApiResponse } from "@/types/api-response";
const url = "/desktop";

// FOR WEIGH TRANSACTIONS
export const getTransits = (admin_id: string, params?: Record<string, any>) => {
  if (!admin_id) return;
  return api.get<ApiResponse>(`${url}/get/transits/${admin_id}`, { params });
};

export const getTransitById = (id: string) => {
  return api.get<ApiResponse>(`${url}/get/transit-record/${id}`);
};

// FOR PENDING WEIGHMENTS OR STAGED WEIGHMENTS
export const getWeighments = (
  admin_id: string,
  params?: Record<string, any>
) => {
  if (!admin_id) return;
  return api.get<ApiResponse>(`${url}/get/weighments/${admin_id}`, { params });
};

export const getWeightById = (id: string) => {
  return api.get<ApiResponse>(`${url}/get/weight-record/${id}`);
};

export const getMissedWeights = (
  admin_id: string,
  params?: Record<string, any>
) => {
  if (!admin_id) return;
  return api.get<ApiResponse>(`${url}/get/pending/weighments/${admin_id}`, {
    params
  });
};

export const updateStatusOfWeight = (
  id: string,
  admin_id: string,
  status: string
) => {
  if (!status) return;

  return api.patch<ApiResponse>(
    `${url}/update/status/weighments/${admin_id}/${id}`,
    { status }
  );
};
