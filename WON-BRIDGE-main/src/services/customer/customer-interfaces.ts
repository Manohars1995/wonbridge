export interface LoginVals {
  phone: number;
  password: string;
}


export interface RegisterCustomer {
  customer_name: string;
  contact_person: string;
  phone: string;
  email: string;
  pincode: string;
  street: string;
  city: string;
  state: string;
  material_types: string[];
  image?: string;
  contract_start_date: string;
  contract_end_date: string;
  gst_in: string;
  customer_category: string[];
  remarks: string;
  status: boolean;
  admin_id?: string;
}


// Server response object
export interface CustomerResponse {
  _id: string;
  custom_id?: string;

  customer_name: string;
  contact_person: string;
  phone: string;
  email: string;
  pincode: string;
  street: string;
  city: string;
  state: string;
  material_types: string[];
  image?: string;
  contract_start_date: string;
  contract_end_date: string;
  gst_in: string;
  customer_category: string[];
  remarks: string;
  status: boolean;
  admin_id?: string;
  
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

