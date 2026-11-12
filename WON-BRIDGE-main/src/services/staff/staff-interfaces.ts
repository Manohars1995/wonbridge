export interface LoginVals {
  phone: number;
  password: string;
}

export interface RegisterStaff {
  full_name: string;
  email: string;
  phone: string;
  assigned_shift: string;
  image?: string;
  pincode: string;
  street: string;
  city: string;
  state: string;
  gender: string;
  work_location: string;
  date_of_joining: string;
  date_of_resignation: string;
  role: string;
  status: boolean;
  admin_id?: string;
}

// Server response object
export interface StaffResponse {
  _id: string;
  custom_id?: string;

  full_name: string | null;
  email: string;
  phone: string | null;
  assigned_shift: string | null;
  date_of_joining: string | null;
  date_of_resignation?: string | null;
  image?: string | null;
  address: string | null;
  gender: string | null;
  work_location: string | null;
  duty_hours: string | null;
  status: boolean;
  admin_id?: string | null;

  role?: 'supervisor' | 'operator';
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
