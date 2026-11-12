// Validator type strings
export const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
export const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
export const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
export const VALIDATOR_TYPE_MIN = 'MIN';
export const VALIDATOR_TYPE_MAX = 'MAX';
export const VALIDATOR_TYPE_EMAIL = 'EMAIL';
export const VALIDATOR_TYPE_FILE = 'FILE';

// Validator Types
export type Validator =
  | { type: typeof VALIDATOR_TYPE_REQUIRE }
  | { type: typeof VALIDATOR_TYPE_MINLENGTH; val: number }
  | { type: typeof VALIDATOR_TYPE_MAXLENGTH; val: number }
  | { type: typeof VALIDATOR_TYPE_MIN; val: number }
  | { type: typeof VALIDATOR_TYPE_MAX; val: number }
  | { type: typeof VALIDATOR_TYPE_EMAIL }
  | { type: typeof VALIDATOR_TYPE_FILE };

// Validator factory functions
export const VALIDATOR_REQUIRE = (): Validator => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = (): Validator => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val
});
export const VALIDATOR_MIN = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MIN,
  val
});
export const VALIDATOR_MAX = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAX,
  val
});
export const VALIDATOR_EMAIL = (): Validator => ({ type: VALIDATOR_TYPE_EMAIL });

// Validation function
export const validate = (value: string, validators: Validator[]): boolean => {
  let isValid = true;

  for (const validator of validators) {
    switch (validator.type) {
      case VALIDATOR_TYPE_REQUIRE:
        isValid = isValid && value.trim().length > 0;
        break;
      case VALIDATOR_TYPE_MINLENGTH:
        isValid = isValid && value.trim().length >= validator.val;
        break;
      case VALIDATOR_TYPE_MAXLENGTH:
        isValid = isValid && value.trim().length <= validator.val;
        break;
      case VALIDATOR_TYPE_MIN:
        isValid = isValid && +value >= validator.val;
        break;
      case VALIDATOR_TYPE_MAX:
        isValid = isValid && +value <= validator.val;
        break;
      case VALIDATOR_TYPE_EMAIL:
        isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        break;
      case VALIDATOR_TYPE_FILE:
        // File validation can be handled differently in file input components
        break;
    }
  }

  return isValid;
};
