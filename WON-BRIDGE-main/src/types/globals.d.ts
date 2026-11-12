// global.d.ts (or inside PhoneAuth.tsx if not using global types)
export {};

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}
