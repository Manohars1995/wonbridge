import api from "../api";
import type { ApiResponse } from "@/types/api-response";
const url = "/dashboard";

export const getInOutData = async () => {
  return api.get<ApiResponse>(`${url}/in-out`);
};

export const getMissedEntriesData = async () => {
  return api.get<ApiResponse>(`${url}/missed-entries`);
};

export const getTodayEntriesData = async () => {
  return api.get<ApiResponse>(`${url}/today-entries`);
};

export const getLatestBackupTimestamp = async () => {
  return api.get<ApiResponse>(`${url}/last-backup-time`);
};

export const getMaterialInOutStock = async () => {
  return api.get<ApiResponse>(`${url}/in-out/materials-stock`);
};

export const getRecentMissedEntries = async () => {
  return api.get<ApiResponse>(`${url}/recent-missed/entries`);
};

export const getDailyActivityNums = async() => {
  return api.get<ApiResponse>(`${url}/daily-activity/numbers`);
  
}