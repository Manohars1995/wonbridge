// Validator type strings
export const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
export const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
export const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
export const VALIDATOR_TYPE_MIN = 'MIN';
export const VALIDATOR_TYPE_MAX = 'MAX';
export const VALIDATOR_TYPE_EMAIL = 'EMAIL';

// Validator Types
export type Validator =
  | { type: typeof VALIDATOR_TYPE_REQUIRE }
  | { type: typeof VALIDATOR_TYPE_MINLENGTH; val: number }
  | { type: typeof VALIDATOR_TYPE_MAXLENGTH; val: number }
  | { type: typeof VALIDATOR_TYPE_MIN; val: number }
  | { type: typeof VALIDATOR_TYPE_MAX; val: number }
  | { type: typeof VALIDATOR_TYPE_EMAIL };

// Validator factory functions
export const VALIDATOR_REQUIRE = (): Validator => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val,
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val,
});
export const VALIDATOR_MIN = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MIN,
  val,
});
export const VALIDATOR_MAX = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAX,
  val,
});
export const VALIDATOR_EMAIL = (): Validator => ({ type: VALIDATOR_TYPE_EMAIL });

// Validation function
export const validate = (value: any, validators: Validator[]): boolean => {
  let isValid = true;
  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && typeof value === "string" && value.trim().length > 0;
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && typeof value === "string" && value.trim().length >= validator.val;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && typeof value === "string" && value.trim().length <= validator.val;
        break;
      case VALIDATOR_TYPE_MIN:
        isValid = isValid && !isNaN(+value) && +value >= validator.val;
        break;
      case VALIDATOR_TYPE_MAX:
        isValid = isValid && !isNaN(+value) && +value <= validator.val;
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && typeof value === "string" && /^\S+@\S+\.\S+$/.test(value);
        break;
    }
  }
  return isValid;
};

