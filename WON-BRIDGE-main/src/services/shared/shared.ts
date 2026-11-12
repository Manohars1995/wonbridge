// src/services/shared/shared.ts
import api from "../api";
import type { ApiResponse } from "@/types/api-response";
import type { PostcodeApiResponse } from "./shared-interfaces";

const url = "/shared";

export const getPincodeData = (pincode: string) => {
  return api.get<ApiResponse<PostcodeApiResponse>>(
    `${url}/pincode-info/${pincode}`
  );
};


export const postImageToS3Bucket = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  return api.post<ApiResponse>(`${url}/post-image`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
};

export const raiseEnquiry = async (data: Record<string, any>) => {
  return api.post<ApiResponse>(`${url}/raise-enquiry`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export const postRequestDemoWonBridge = (payload: {
  name: string;
  contact: string;
  email: string;
  designation?: string;
  organization?: string;
  time: string;
  source?: string;
  matter?: string;
}) => {
  return api.post<ApiResponse>(`${url}/demo`, payload);
};