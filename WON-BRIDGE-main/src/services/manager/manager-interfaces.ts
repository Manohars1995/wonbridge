export interface LoginVals {
  phone: number;
  password: string;
}

export interface registerManager {
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
  date_of_resignation:string;
  status: boolean;
  admin_id?: string;
}





// Server response object
export interface ManagerResponse {
  _id: string;
  custom_id?: string;

  full_name: string | null;
  email: string;
  phone: string | null;
  assigned_shift: string | null;
  date_of_joining: string | null;
  image?: string | null;
  address: string | null;
  gender: string | null;
  work_location: string | null;
  duty_hours: string | null;
  status: boolean;
  owner?: string | null;

  role?: 'manager' | 'admin' | 'super admin';
  createdAt: string;
  updatedAt: string;
  __v?: number;
}
