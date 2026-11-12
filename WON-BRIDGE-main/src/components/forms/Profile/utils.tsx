export interface Field<T> {
  value: T;
  isValid: boolean;
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
  country: Field<string>;
  gender: Field<string>;
  work_location: Field<string>;
  date_of_joining: Field<string>;
  date_of_resignation: Field<string>;
  status: Field<boolean>;
  admin_id: Field<string>;
  role: Field<string>;
  company_name: Field<string>;
  company_id: Field<string>;
  [key: string]: Field<any>;
}

export const initialProfileFormState: stateVals = {
  full_name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  phone: { value: "", isValid: false },
  assigned_shift: { value: "", isValid: false },
  image: { value: "", isValid: true },
  pincode: { value: "", isValid: false },
  street: { value: "", isValid: false },
  city: { value: "", isValid: false },
  district: { value: "", isValid: false },
  state: { value: "", isValid: false },
  country: { value: "", isValid: false },
  gender: { value: "", isValid: false },
  work_location: { value: "", isValid: false },
  date_of_joining: { value: "", isValid: false },
  date_of_resignation: { value: "", isValid: false },
  status: { value: false, isValid: true },
  admin_id: { value: "", isValid: true },
  role: { value: "", isValid: true },
  company_name: { value: "", isValid: true },
  company_id: { value: "", isValid: true },
};

export interface ProfileFormFieldsProps {
  profileData: stateVals;
  handleInputChange: (
    field: keyof stateVals,
    val: string,
    isValid: boolean
  ) => void;
}




export type InputType = "text" | "email" | "number" | "tel" | "date" | "select" | "file";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: InputType;
  editable?: boolean;
  required?: boolean;
  validators?: any[]; // or your specific Validator[] type
  options?: SelectOption[]; // for select
}

export interface SectionConfig {
  title: string;
  fields: FieldConfig[];
  editActive:boolean;
}

export type ProfileSchema = Record<string, SectionConfig[]>;


export function extractAndMapToState<
  T extends Record<string, FieldType>,
  FieldType extends Field<any> = Field<any>
>(
  data: any,
  initialState: T,
  nestedFields: Record<string, string[]> = {}
): T {
  const flatData: Record<string, any> = { ...data };

  // Flatten selected nested fields
  for (const [parentKey, childKeys] of Object.entries(nestedFields)) {
    const nested = data?.[parentKey];
    if (nested && typeof nested === "object") {
      childKeys.forEach((childKey) => {
        flatData[childKey] = nested[childKey];
      });
    }
  }

  // Safely construct result typed as T
  const result = {} as T;

  for (const key in initialState) {
    result[key] = {
      value: flatData[key] ?? "",
      isValid: true
    } as T[typeof key];
  }

  return result;
}


export const getChangedFields = (
  profile: stateVals,
  originalProfile: stateVals,
  exclude: string[] = []
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in profile) {
    if (exclude.includes(key)) continue;

    const currentVal = profile[key as keyof stateVals]?.value;
    const originalVal = originalProfile[key as keyof stateVals]?.value;

    if (currentVal !== originalVal) {
      result[key] = currentVal;
    }
  }

  return result;
};


export const extractAddressFields = (
  flatData: Record<string, any>,
  addressKeys: string[]
): { address: Record<string, any>; remaining: Record<string, any> } => {
  const address: Record<string, any> = {};
  const remaining: Record<string, any> = {};

  for (const key in flatData) {
    if (addressKeys.includes(key)) {
      address[key] = flatData[key];
    } else {
      remaining[key] = flatData[key];
    }
  }

  return {
    address,
    remaining
  };
};
