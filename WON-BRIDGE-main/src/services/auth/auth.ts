import api from "../api";
import type { ApiResponse } from "@/types/api-response";
import axios from "axios";
const url = "/auth";

export const sendOtp = (phone: string) => {
  return api.post<ApiResponse>(`${url}/send-otp`, { phone });
};

export const verifyOtp = (phone: string, otp: string) => {
  return api.post<ApiResponse>(
    `${url}/verify-otp`,
    { phone, otp },
    { withCredentials: true }
  );
};

// export const logout = () => {
//   console.log("Calling logout API");
//   return api.post<ApiResponse>(`${url}/logout`, null, {
//     withCredentials: true
//   });
// };

export const logout = async () => {
  console.log("Calling logout API");
  try {
    const res = await api.post<ApiResponse>(`${url}/logout`, {});
    console.log("Logout response:", res.status, res.data);
    return res;
  } catch (err: any) {
    console.error("Logout request failed:", err.message || err);
    if (axios.isAxiosError(err)) {
      console.error("Status:", err.response?.status);
      console.error("Response data:", err.response?.data);
      console.error("Response headers:", err.response?.headers);
      console.error("Request config:", err.config);
      console.error("Request sent (XHR):", err.request);
    }
    throw err;
  }
};
