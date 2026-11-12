export interface LoginVals {
  phone: number;
  password: string;
}

interface SupplierBase {
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  image: string;
  source_type: string;
  contract_start_date: string;
  contract_end_date: string;
  pincode: string;
  street: string;
  city: string;
  state: string;
  material_supplied: string[];
  gst_in: string;
  status: boolean;
  admin_id?: string;
}

export interface RegisterSupplier extends SupplierBase {}

export interface SupplierResponse extends SupplierBase {
  _id: string;
  custom_id?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

