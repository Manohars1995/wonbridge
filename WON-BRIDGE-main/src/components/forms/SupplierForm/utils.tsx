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
  company_name: Field<string>;
  contact_person: Field<string>;
  email: Field<string>;
  phone: Field<string>;
  image: Field<string>;
  source_type: Field<string>;
  contract_start_date: Field<string>;
  contract_end_date: Field<string>;
  pincode: Field<string>;
  street: Field<string>;
  city: Field<string>;
  district: Field<string>;
  state: Field<string>;
  materials: Field<string>;
  gst_in: Field<string>;
  status: Field<boolean>;
  admin_id: Field<string>;
  [key: string]: Field<any>;
}

export const initialSupplierState: stateVals = {
  // id: { value: "", isValid: true },
  company_name: { value: "", isValid: false },
  contact_person: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  image: { value: "", isValid: true },
  source_type: { value: "quarry", isValid: true },
  contract_start_date: { value: "", isValid: false },
  contract_end_date: { value: "", isValid: false },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  materials: { value: "", isValid: false },
  gst_in: { value: "", isValid: false },
  status: { value: true, isValid: true },
  admin_id: { value: "", isValid: true }
};

export interface propVals {
  Id: string | null;
  isOpen: boolean;
  onClose: () => void;
  UID?: string | null;
}

export interface FormFieldsProps {
  supplierDetails: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    val: string | string[],
    isValid: boolean
  ) => void;
  adminOptions: SelectOption[];
  adminLoading: boolean;
  postCodeLoading?: boolean;
}
