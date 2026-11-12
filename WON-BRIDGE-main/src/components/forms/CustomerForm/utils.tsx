export interface SelectOption {
  value: string;
  label: string;
}

export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface stateVals {
  // id?: Field<string>;
  customer_name: Field<string>;
  contact_person: Field<string>;
  phone: Field<string>;
  email: Field<string>;
  pincode: Field<string>;
  street: Field<string>;
  city: Field<string>;
  district: Field<string>;
  state: Field<string>;
  material_types: Field<string[]>;
  // material_types: Field<string>;
  image: Field<string>;
  contract_start_date: Field<string>;
  contract_end_date: Field<string>;
  gst_in: Field<string>;
  customer_category: Field<string>;
  remarks: Field<string>;
  status: Field<boolean>;
  admin_id: Field<string>;
  [key: string]: Field<any>;
}

export const initialCustomerState: stateVals = {
  // id: { value: "", isValid: false },
  customer_name: { value: "", isValid: false },
  contact_person: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  email: { value: "", isValid: false },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  material_types: { value: [], isValid: false },
  image: { value: "", isValid: false },
  contract_start_date: { value: "", isValid: false },
  contract_end_date: { value: "", isValid: false },
  gst_in: { value: "", isValid: false },
  customer_category: { value: "", isValid: false },
  remarks: { value: "", isValid: false },
  status: { value: true, isValid: true },
  admin_id: { value: "", isValid: false }
};



export interface Props {
  customerDetails: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    value: string | string[],
    isValid: boolean
  ) => void;
  adminOptions: SelectOption[];
  adminLoading: boolean;
  postCodeLoading?:boolean;
}