import { useState, useCallback, useContext, useEffect } from "react";
import  { AxiosError } from "axios";
import MobileNumberInput from "@/components/UIElements/Input-Elements/mobile-number-input";
import { initialSigninState } from "./utils";
import type { SigninStateVals } from "./utils";
import { sendOtp, verifyOtp } from "@/services/auth/auth";
import { showToast } from "@/components/UI/toast";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import OtpInput from "./OtpInput";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { useNavigate } from "react-router-dom";

// user type
type User = {
  role: string;
  reference_id: string;
  [key: string]: any;
};

const SigninForm = () => {
  const navigate = useNavigate();
  const { setUserRole, setUserID, setIsLoggedIn } =
    useContext(WonBridgeContext);
  const [signinDetails, setSigninDetails] = useState({ ...initialSigninState });
  const [isOtpInputOpen, setIsOtpInputOpen] = useState(false);
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpInputOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, isOtpInputOpen]);

  const handleInputChange = useCallback(
    (field: keyof SigninStateVals, val: string, isValid: boolean) => {
      setSigninDetails((prev) => ({
        ...prev,
        [field]: { value: val, isValid }
      }));
    },
    []
  );

  const GetOtpHandler = async () => {
    setLoading(true);

    try {
      if (!signinDetails?.phone.value || !signinDetails?.phone.isValid) {
        showToast.error("Please enter a valid phone number");
        return;
      }

      const res = await sendOtp(signinDetails.phone.value);

      if (res?.data?.success) {
        showToast.success(res.data.message);
        setIsOtpInputOpen(true);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      const backendMessage =
        error.response?.data?.message || "Failed to send OTP";

      showToast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async () => {
    setLoading(true);

    try {
      if (!isOtpInputOpen) return showToast.warning("Please request OTP first");

      if (!signinDetails?.otp.value)
        return showToast.error("OTP cannot be empty");

      if (signinDetails.otp.value.length < 6)
        return showToast.error("OTP must be at least 6 digits");

      if (!signinDetails.otp.isValid)
        return showToast.error("Invalid OTP format");

      const res = await verifyOtp(
        signinDetails.phone.value,
        signinDetails.otp.value
      );

      if (res?.data?.success) {
        showToast.success(res.data.message);

        const user = res.data.user as User;

        setUserRole(user.role.toLowerCase());
        setUserID(user.reference_id);
        setIsLoggedIn(true);

        setIsOtpInputOpen(false);

        navigate("/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;

      const backendMessage =
        error.response?.data?.message || "OTP verification failed";

      showToast.error(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center relative h-full bg-[url('../images/bridge-vector-1.png')] bg-cover bg-center bg-no-repeat rounded-lg p-4 sm:p-6">
      <div className="p-3 flex justify-center items-center bg-transparent w-full">
        <div className="bg-white w-full max-w-md sm:max-w-lg rounded-2xl border border-black/50 flex flex-col justify-center items-center shadow-lg">
          <div className="bg-white/20 rounded-2xl p-4 sm:p-5 w-full border border-gray-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#1c1c1c] mb-4 sm:mb-6">
              SignIn
            </h2>
            <form
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (isOtpInputOpen) {
                    verifyOTP();
                  } else {
                    GetOtpHandler();
                  }
                }
              }}
            >
              <MobileNumberInput
                value={signinDetails.phone.value}
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
                onChangeVal={(val, isValid) =>
                  handleInputChange("phone", val, isValid)
                }
              />

              {isOtpInputOpen && (
                <OtpInput
                  onOtpChange={(val, isValid) =>
                    handleInputChange("otp", val, isValid)
                  }
                />
              )}

              <button
                type="button"
                onClick={isOtpInputOpen ? verifyOTP : GetOtpHandler}
                disabled={loading || !signinDetails.phone.isValid}
                className={`mt-4 w-full py-2 rounded-md text-sm sm:text-base font-medium flex items-center justify-center transition-colors duration-200 ${
                  signinDetails.phone.isValid && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-3 border-t-blue-500 border-gray-300 rounded-full" />
                ) : isOtpInputOpen ? (
                  "Verify"
                ) : (
                  "Get OTP"
                )}
              </button>

              {isOtpInputOpen && (
                <div>
                  <p className="text-[0.75rem] sm:text-[0.8rem] text-black w-full flex flex-col items-center justify-center gap-1 mt-2">
                    Didn't receive the code?
                  </p>

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      className={`bg-transparent border-none text-indigo-400 ${
                        timer > 0 ? "cursor-not-allowed" : "cursor-pointer"
                      } text-[0.75rem] sm:text-[0.8rem] font-bold underline`}
                      onClick={GetOtpHandler}
                      disabled={timer > 0}
                    >
                      Resend OTP
                    </button>

                    {timer > 0 ? (
                      <span className="text-[0.75rem] sm:text-[0.8rem] text-black">
                        in{" "}
                        <strong className="text-[#e5383b]">
                          {Math.floor(timer / 60)}:
                          {String(timer % 60).padStart(2, "0")}
                        </strong>{" "}
                        minutes
                      </span>
                    ) : (
                      <span className="text-[0.75rem] sm:text-[0.8rem] text-black/50 font-medium">
                        You can now resend the OTP
                      </span>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;
