export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: object;
  refreshToken?: string;
  accessToken?: string;
  total?:number;
  staffData?:object;
  [key: string]: unknown;
}
