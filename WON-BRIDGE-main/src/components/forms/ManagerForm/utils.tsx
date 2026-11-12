export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface stateVals {
  full_name: Field<string>;
  email: Field<string>;
  phone: Field<string>;
  assigned_shift: Field<string>;
  image: Field<string>;
  pincode: Field<string>;
  street: Field<string>;
  city: Field<string>;
  district: Field<string>;
  state: Field<string>;
  gender: Field<string>;
  work_location: Field<string>;
  date_of_joining: Field<string>;
  date_of_resignation: Field<string>;
  status: Field<boolean>;
  admin_id: Field<string>;
  [key: string]: Field<any>;
}

export interface ManagerFormFieldsProps {
  managerDetails: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    val: string,
    isValid: boolean
  ) => void;
  adminOptions: SelectOption[];
  adminLoading: boolean;
  postCodeLoading: boolean;
}

export const initialManagerFormState: stateVals = {
  full_name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  assigned_shift: { value: "morning", isValid: true },
  image: { value: "", isValid: true },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  gender: { value: "male", isValid: true },
  work_location: { value: "", isValid: false },
  date_of_joining: { value: "", isValid: false },
  date_of_resignation: { value: "", isValid: false },
  status: { value: true, isValid: true },
  admin_id: { value: "", isValid: true }
};

export const extractFormValues = (details: stateVals) => {
  const result: Record<string, any> = {};
  const addressFields = [
    "street",
    "city",
    "state",
    "district",
    "pincode",
    "country"
  ];
  const address: Record<string, any> = {};

  for (const [key, field] of Object.entries(details)) {
    if (addressFields.includes(key)) {
      address[key] = field.value;
    } else {
      result[key] = field.value;
    }
  }

  result.address = {
    ...address,
    country: address.country ?? "India"
  };

  return result;
};
