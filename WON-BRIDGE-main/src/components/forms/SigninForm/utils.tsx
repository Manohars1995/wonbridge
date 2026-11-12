import type { Field } from "@/components/forms/utils";

export interface SigninStateVals {
  phone: Field<string>;
  otp: Field<string>;
}

export const initialSigninState: SigninStateVals = {
  phone: { value: "", isValid: false },
  otp: { value: "", isValid: false }
};
