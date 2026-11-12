export interface LoginVals {
  phone: number;
  password: string;
}

export interface registerAdmin {
  full_name: string;
  image?: string;
  email: string;
  phone: string;
  password: string;
  company_name: string;
  pincode: string;

  // Address fields
  street: string;
  city: string;
  state: string;

  // Crusher info
  crusher_name: string;
  crusher_location: string;
  capacity: string;
  machine_brand: string;
  year_installed: string;
  ownership_type: string;
  status: string;
  alert_rules?: any[];
}

// Admin response
export interface AdminResponse {
  _id: string;
  custom_id?: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  company_name: string | null;
  pincode: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  crusher_name: string | null;
  crusher_location: string | null;
  capacity: number | null;
  machine_brand: string | null;
  year_installed: number | null;
  image?: string | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  threshold: boolean;
  threshold_limit: {
    min: number;
    max: number;
  };
  backup_schedule_preference: string;
  alert_rules: any[];

  
  __v?: number;
  [key:string]: unknown;
}

