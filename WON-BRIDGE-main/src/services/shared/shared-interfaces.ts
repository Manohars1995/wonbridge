export interface AddressData {
  city?: string;
  state?: string;
  district?: string;
  [key: string]: unknown;
}

export interface PostcodeApiResponse {
  success: boolean;
  message?: string;
  data?: AddressData;
   [key: string]: unknown;
}