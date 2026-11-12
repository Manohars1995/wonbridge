import { useEffect, useRef } from "react";

interface OtpInputProps {
  otpLength?: number;
  onOtpChange: (val: string, isValid: boolean) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ otpLength = 6, onOtpChange }) => {
  // Create refs only once
  const otpRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // Clear on mount
    otpRefs.current.forEach((input) => {
      if (input) input.value = "";
    });
  }, []);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (index < otpLength - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }

    const otpValue = otpRefs.current
      .map((input) => input?.value ?? "")
      .join("");
    const isValid = otpValue.length === otpLength;
    onOtpChange(otpValue, isValid);
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="bg-white flex flex-col items-center justify-center p-2 my-2 gap-5 rounded-[15px]">
      <span className="text-[1.1em] text-black font-bold">Enter OTP</span>
      <div className="w-full flex flex-row gap-2 items-center justify-center">
        {Array.from({ length: otpLength }, (_, index) => (
          <input
            autoFocus={index === 0}
            key={index}
            ref={(el) => {
              if (el) otpRefs.current[index] = el;
            }}
            required
            maxLength={1}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="otp-input bg-[#e4e4e4] w-[30px] h-[30px] text-center border-none rounded-[7px] caret-indigo-400 text-gray-800 font-semibold focus:bg-indigo-100 transition duration-300 outline-none"
            onChange={(e) => handleOtpChange(e, index)}
            onKeyDown={(e) => handleOtpKeyDown(e, index)}
          />
        ))}
      </div>

      <p className="text-[0.7em] text-black leading-[17px] text-center">
        We have sent a verification code to your mobile number
      </p>
    </div>
  );
};

export default OtpInput;
