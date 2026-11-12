export const headerOptions = {};

export interface Field<T> {
  value: T;
  isValid: boolean;
}

export interface ContactFormData {
  full_name: Field<string>;
  email: Field<string>;
  company_name: Field<string>;
  contact_number: Field<string>;
  city: Field<string>;
  industry: Field<string>;
  customer_type: Field<string>;
  message: Field<string>;
  terms: Field<boolean>;
}

export const initialState: ContactFormData = {
  full_name: { value: "", isValid: false },
  email: { value: "", isValid: false },
  company_name: { value: "", isValid: false },
  contact_number: { value: "", isValid: false },
  city: { value: "", isValid: false },
  industry: { value: "mining", isValid: true },
  customer_type: { value: "end-customer", isValid: true },
  message: { value: "", isValid: false },
  terms: { value: false, isValid: false }
};

export const industryOptions = [
  { value: "mining", label: "Mining" },
]

