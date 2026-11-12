"use client";
import { useState, useRef, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { postRequestDemoWonBridge } from "@/services/shared/shared";

/* ─── Validation ─── */
function validate(values: typeof initialValues) {
  const errors: Partial<typeof initialValues> = {};
  if (!values.fullName.trim()) errors.fullName = "* Name is required";
  if (!values.phone.trim()) errors.phone = "* Phone number is required";
  else if (values.phone.replace(/\D/g, "").length < 7)
    errors.phone = "* Enter a valid phone number";
  if (!values.email.trim()) errors.email = "* Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "* Invalid email address";
  if (!values.company.trim()) errors.company = "* Company name is required";
  if (!values.subject) errors.subject = "* Please select an option";
  if (!values.time) errors.time = "* Please select a preferred time";
  if (!values.timeZone) errors.timeZone = "* Please select a timezone";
  // if (!values.message.trim())
  //   errors.message = "* Please describe your requirements";
  return errors;
}

const initialValues = {
  fullName: "",
  email: "",
  phone: "+91",
  company: "",
  subject: "",
  time: "10:00  AM",
  timeZone:
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata"
      : "Asia/Kolkata",
  message: "",
};

const HEAR_OPTIONS = [
  { label: "Google Search", value: "google" },
  { label: "Social Media", value: "social_media" },
  { label: "Referral", value: "referral" },
  { label: "Advertisement", value: "advertisement" },
  { label: "Trade Show / Event", value: "trade_show" },
  { label: "Other", value: "other" },
];

const TIMEZONE_OPTIONS = [
  { label: "IST – India Standard Time (UTC+5:30)", value: "Asia/Kolkata" },
  { label: "UTC – Coordinated Universal Time", value: "UTC" },
  { label: "EST – Eastern Standard Time (UTC−5)", value: "America/New_York" },
  { label: "CST – Central Standard Time (UTC−6)", value: "America/Chicago" },
  { label: "MST – Mountain Standard Time (UTC−7)", value: "America/Denver" },
  {
    label: "PST – Pacific Standard Time (UTC−8)",
    value: "America/Los_Angeles",
  },
  { label: "GMT – Greenwich Mean Time (UTC+0)", value: "Europe/London" },
  { label: "CET – Central European Time (UTC+1)", value: "Europe/Paris" },
  { label: "EET – Eastern European Time (UTC+2)", value: "Europe/Helsinki" },
  { label: "MSK – Moscow Standard Time (UTC+3)", value: "Europe/Moscow" },
  { label: "GST – Gulf Standard Time (UTC+4)", value: "Asia/Dubai" },
  { label: "PKT – Pakistan Standard Time (UTC+5)", value: "Asia/Karachi" },
  { label: "BST – Bangladesh Standard Time (UTC+6)", value: "Asia/Dhaka" },
  { label: "ICT – Indochina Time (UTC+7)", value: "Asia/Bangkok" },
  { label: "CST – China Standard Time (UTC+8)", value: "Asia/Shanghai" },
  { label: "JST – Japan Standard Time (UTC+9)", value: "Asia/Tokyo" },
  {
    label: "AEST – Australian Eastern Time (UTC+10)",
    value: "Australia/Sydney",
  },
  {
    label: "NZST – New Zealand Standard Time (UTC+12)",
    value: "Pacific/Auckland",
  },
];

/* ─── Field wrapper ─── */
function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string | boolean;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-gray-700 tracking-tight">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {children}
      {error && <span className="text-xs text-red-500 -mt-0.5">{error}</span>}
    </div>
  );
}

/* ─── Styled Input ─── */
function StyledInput({
  hasError,
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
  icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      {icon && (
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${focused ? "text-orange-500" : "text-gray-400"}`}
        >
          {icon}
        </span>
      )}
      <input
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`w-full rounded-xl py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all bg-gray-50 focus:bg-white
          ${icon ? "pl-10 pr-3" : "px-3"}
          ${hasError ? "border-2 border-red-300 focus:ring-2 focus:ring-red-100" : focused ? "border-2 border-orange-400 ring-2 ring-orange-100" : "border border-gray-200"}`}
      />
    </div>
  );
}

/* ─── Styled Select ─── */
function StyledSelect({
  hasError,
  icon,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-10">
          {icon}
        </span>
      )}
      <select
        {...props}
        className={`w-full rounded-xl py-2.5 text-sm outline-none transition-all bg-gray-50 focus:bg-white appearance-none cursor-pointer
          ${icon ? "pl-10 pr-8" : "px-3 pr-8"}
          ${hasError ? "border-2 border-red-300 focus:ring-2 focus:ring-red-100" : "border border-gray-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100"}
          ${props.value ? "text-gray-800" : "text-gray-400"}`}
      >
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </div>
  );
}

/* ─── Styled Textarea ─── */
function StyledTextarea({
  hasError,
  icon,
  maxLength,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
  icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      {icon && (
        <span
          className={`absolute left-3 top-3 pointer-events-none transition-colors ${focused ? "text-orange-500" : "text-gray-400"}`}
        >
          {icon}
        </span>
      )}
      <textarea
        {...props}
        maxLength={maxLength}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`w-full rounded-xl py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all bg-gray-50 focus:bg-white resize-none min-h-[120px] font-sans
          ${icon ? "pl-10 pr-3" : "px-3"}
          ${hasError ? "border-2 border-red-300 focus:ring-2 focus:ring-red-100" : focused ? "border-2 border-orange-400 ring-2 ring-orange-100" : "border border-gray-200"}`}
      />
      {maxLength && (
        <span className="absolute bottom-2.5 right-3 text-xs text-gray-400">
          {String(props.value ?? "").length}/{maxLength}
        </span>
      )}
    </div>
  );
}

/* ─── Custom Dropdown ─── */
function CustomDropdown({
  value,
  onChange,
  onTouch,
  hasError,
  icon,
  placeholder,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  onTouch?: () => void;
  hasError?: boolean;
  icon?: React.ReactNode;
  placeholder: string;
  options: { label: string; value: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen((p) => !p);
        }}
        className={`w-full rounded-xl py-2.5 pl-10 pr-8 text-sm outline-none transition-all bg-gray-50 text-left flex items-center cursor-pointer
          ${hasError ? "border-2 border-red-300" : open ? "border-2 border-orange-400 ring-2 ring-orange-100 bg-white" : "border border-gray-200"}
          ${selected ? "text-gray-800" : "text-gray-400"}`}
      >
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${open ? "text-orange-500" : "text-gray-400"}`}
        >
          {icon}
        </span>
        {selected ? selected.label : placeholder}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute z-[99999] mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                ${value === opt.value ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-600 hover:bg-orange-50 hover:text-orange-500"}`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Time Picker with AM/PM toggle (matches reference image) ─── */
function TimePicker({
  value,
  onChange,
  onBlur,
  hasError,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
}) {
  const parseTime = (val: string) => {
  const parts = val.split(" ");
  const [h, m] = parts[0].split(":").map(Number);
  const hour = isNaN(h) ? 10 : h;
  const minute = isNaN(m) ? 0 : m;
  const ampm = parts[1] === "PM" ? "PM" : "AM";
  // clamp hour to 1–12 for display
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return { hour: displayHour, minute, ampm };
};

  const { hour, minute, ampm } = parseTime(value);

  const emit = (h: number, m: number, period: string) => {
  onChange(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`);
};

const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div
      onBlur={onBlur}
      className={`flex items-center rounded-xl bg-gray-50 transition-all overflow-hidden
    ${hasError ? "border-2 border-red-300" : "border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100"}`}
    >
      {/* Clock icon */}
      <span className="pl-3 text-gray-400 flex-shrink-0">
        <IconClock />
      </span>

      {/* Hour select */}
      <select
        value={hour}
        onChange={(e) => emit(Number(e.target.value), minute, ampm)}
        className="w-12 py-2.5 px-2 text-sm text-gray-800 bg-transparent outline-none cursor-pointer appearance-none text-center"
      >
        {hours.map((h) => (
          <option key={h} value={h}>
            {String(h).padStart(2, "0")}
          </option>
        ))}
      </select>

      <span className="text-gray-400 font-bold text-base select-none">:</span>

      {/* Minute select */}
      <select
        value={minute}
        onChange={(e) => emit(hour, Number(e.target.value), ampm)}
        className="w-12 py-2.5 px-2 text-sm text-gray-800 bg-transparent outline-none cursor-pointer appearance-none text-center"
      >
        {minutes.map((m) => (
          <option key={m} value={m}>
            {String(m).padStart(2, "0")}
          </option>
        ))}
      </select>

      {/* AM / PM toggle button — pushed to end */}
      <button
        type="button"
        onClick={() => emit(hour, minute, ampm === "AM" ? "PM" : "AM")}
        className="ml-auto m-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 transition-colors flex-shrink-0 min-w-[42px]"
      >
        {ampm}
      </button>
    </div>
  );
}

/* ─── Icons ─── */
const IconUser = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconPhone = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 010 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);
const IconMail = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconBuilding = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconSearch = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconClock = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconGlobe = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const IconChat = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);
const IconLocation = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconShield = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

/* ─── Dot Pattern SVG ─── */
const DotPattern = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {[0, 1, 2, 3, 4].map((row) =>
      [0, 1, 2, 3, 4].map((col) => (
        <circle
          key={`${row}-${col}`}
          cx={col * 16 + 8}
          cy={row * 16 + 8}
          r="2"
          fill="#f97316"
          opacity="0.25"
        />
      )),
    )}
  </svg>
);

/* ─── Orange Blob ─── */
const OrangeBlob = () => (
  <svg
    width="160"
    height="120"
    viewBox="0 0 160 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="100" cy="90" rx="100" ry="80" fill="#f97316" opacity="0.15" />
  </svg>
);

const INFO_ITEMS = [
  {
    icon: <IconPhone />,
    label: "Call Us",
    value: "+91 7893536373",
    sub: "Mon–Sat, 10 AM – 6 PM (IST)",
    highlight: true,
  },
  {
    icon: <IconMail />,
    label: "Email Us",
    value: "sales@nowitservices.com",
    highlight: false,
  },
  {
    icon: <IconLocation />,
    label: "Support",
    value: "Within 24 hours on business days",
    highlight: false,
  },
];

/* ═══════════════ Main Component ═══════════════ */
const Contact = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<typeof initialValues>>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof typeof initialValues, boolean>>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof initialValues]) {
      setErrors((prev) => ({
        ...prev,
        ...validate({ ...values, [name]: value }),
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate({ ...values, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.keys(values).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as Record<keyof typeof initialValues, boolean>,
    );
    setTouched(allTouched);
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    try {
      await postRequestDemoWonBridge({
        name: values.fullName,
        contact: values.phone,
        email: values.email,
        organization: values.company,
        time: `${values.time} (${values.timeZone})`,
        matter: values.message,
        source: values.subject,
      });
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success State ── */
  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-[#fdf8f3] overflow-x-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-orange-50 border border-orange-200 rounded-3xl p-14 text-center max-w-md mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-orange-500 font-black text-xl mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Our team will get back to you within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setValues(initialValues);
                setTouched({});
                setErrors({});
              }}
              className="mt-6 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Send Another
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-[#fdf8f3] overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-3">
            Contact Us
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Get in Touch with Our Experts
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-md mx-auto">
            Have questions about weighbridge automation? Fill out the form and
            we'll get back to you shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 items-stretch">
          {/* ── Left Panel ── */}
          <div className="relative bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="absolute top-3 right-3 z-0">
              <DotPattern />
            </div>
            <div className="absolute bottom-0 right-0 z-0">
              <OrangeBlob />
            </div>
            <div className="relative z-10 p-8 flex flex-col h-full">
              <h3 className="text-2xl font-black text-gray-900 mb-1">
                Let's Talk
              </h3>
              <div className="w-8 h-1 bg-orange-500 rounded-full mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed mb-1">
                Reach out to us through any of these channels or fill the form.
              </p>
              <div className="flex flex-col">
                {INFO_ITEMS.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-4 py-5">
                      <div className="w-11 h-11 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-500">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800 mb-0.5">
                          {item.label}
                        </p>
                        {item.highlight ? (
                          <>
                            <p className="text-sm font-bold text-orange-500">
                              {item.value}
                            </p>
                            {"sub" in item && (
                              <p className="text-xs text-gray-400 mt-0.5">
                                {item.sub}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                    {i < INFO_ITEMS.length - 1 && (
                      <div className="h-px bg-gray-100" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-auto hidden lg:block w-full">
                <img
                  src="https://res.cloudinary.com/dtb4vozhy/image/upload/v1778132604/ChatGPT_Image_May_7_2026_11_13_04_AM_m3v57t.png"
                  alt="Weighbridge Truck"
                  className="w-full max-h-[170px] object-contain"
                />
              </div>
            </div>
          </div>

          {/* ── Right Panel: Form ── */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 sm:p-9 h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="h-full flex flex-col"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 flex-1">
                <Field
                  label="Full Name"
                  required
                  error={touched.fullName && errors.fullName}
                >
                  <StyledInput
                    name="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={touched.fullName && !!errors.fullName}
                    icon={<IconUser />}
                  />
                </Field>

                <Field
                  label="Phone Number"
                  required
                  error={touched.phone && errors.phone}
                >
                  <div
                    className={`rounded-xl bg-gray-50 transition-all ${touched.phone && errors.phone ? "border-2 border-red-300" : "border border-gray-200"}`}
                  >
                    <PhoneInput
                      country="in"
                      value={values.phone}
                      onChange={(val: any) => {
                        setValues((prev) => ({ ...prev, phone: val }));
                        if (touched.phone) {
                          setErrors((prev) => ({
                            ...prev,
                            phone:
                              val.replace(/\D/g, "").length >= 7
                                ? undefined
                                : "* Enter a valid phone number",
                          }));
                        }
                      }}
                      onBlur={() => {
                        setTouched((prev) => ({ ...prev, phone: true }));
                        setErrors((prev) => ({
                          ...prev,
                          ...validate({ ...values }),
                        }));
                      }}
                      countryCodeEditable={true}
                      disableDropdown={false}
                      containerStyle={{ width: "100%" }}
                      inputStyle={{
                        width: "100%",
                        height: "42px",
                        border: "none",
                        borderRadius: "0.75rem",
                        background: "transparent",
                        fontSize: "14px",
                        color: "#1f2937",
                        paddingLeft: "52px",
                      }}
                      dropdownStyle={{
                        maxHeight: "200px",
                        overflowY: "auto",
                        zIndex: 99999,
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                      }}
                    />
                  </div>
                </Field>

                <Field
                  label="Email Address"
                  required
                  error={touched.email && errors.email}
                >
                  <StyledInput
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={touched.email && !!errors.email}
                    icon={<IconMail />}
                  />
                </Field>

                <Field
                  label="Company Name"
                  required
                  error={touched.company && errors.company}
                >
                  <StyledInput
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    hasError={touched.company && !!errors.company}
                    icon={<IconBuilding />}
                  />
                </Field>

                {/* ── How did you hear about us? ── */}
                <Field
                  label="How Did You Hear About Us?"
                  required
                  error={touched.subject && errors.subject}
                >
                  <CustomDropdown
                    value={values.subject}
                    onChange={(val) => {
                      setValues((prev) => ({ ...prev, subject: val }));
                      setErrors((prev) => ({ ...prev, subject: undefined }));
                    }}
                    onTouch={() =>
                      setTouched((prev) => ({ ...prev, subject: true }))
                    }
                    hasError={touched.subject && !!errors.subject}
                    icon={<IconSearch />}
                    placeholder="Select an option"
                    options={HEAR_OPTIONS}
                  />
                </Field>

                {/* ── Time to Contact ── */}
                <Field
                  label="Time to Contact"
                  required
                  error={touched.time && errors.time}
                >
                  <TimePicker
                    value={values.time}
                    onChange={(val) => {
                      setValues((prev) => ({ ...prev, time: val }));
                      if (touched.time)
                        setErrors((prev) => ({
                          ...prev,
                          ...validate({ ...values, time: val }),
                        }));
                    }}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, time: true }))
                    }
                    hasError={touched.time && !!errors.time}
                  />
                </Field>

                {/* ── Time Zone (full row) ── */}
                <div className="sm:col-span-2">
                  <Field
                    label="Time Zone"
                    required
                    error={touched.timeZone && errors.timeZone}
                  >
                    <StyledSelect
                      name="timeZone"
                      value={values.timeZone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={touched.timeZone && !!errors.timeZone}
                      icon={<IconGlobe />}
                    >
                      {TIMEZONE_OPTIONS.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </StyledSelect>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field
                    label="Message"
                    required
                    error={touched.message && errors.message}
                  >
                    <StyledTextarea
                      name="message"
                      placeholder="Tell us about your requirements..."
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      hasError={touched.message && !!errors.message}
                      maxLength={500}
                      icon={<IconChat />}
                    />
                  </Field>
                </div>
              </div>

              {/* Privacy note */}
              <div className="flex items-center gap-3 bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 mb-5">
                <span className="text-orange-500 flex-shrink-0">
                  <IconShield />
                </span>
                <div>
                  <p className="text-xs font-bold text-gray-800">
                    Your information is safe with us.
                  </p>
                  <p className="text-xs text-gray-500">
                    We only use your details to respond to your inquiry.
                  </p>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all
                  ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 shadow-lg shadow-orange-200 hover:shadow-orange-300"}`}
              >
                {submitting ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                      <path d="M12 2a10 10 0 0110 10" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .react-tel-input .flag-dropdown {
          background: transparent !important; border: none !important;
          border-right: 1px solid #e5e7eb !important;
          border-radius: 0.75rem 0 0 0.75rem !important;
        }
        .react-tel-input .flag-dropdown.open { background: transparent !important; border-radius: 0.75rem 0 0 0.75rem !important; }
        .react-tel-input .flag-dropdown.open .selected-flag { background: transparent !important; border-radius: 0.75rem 0 0 0.75rem !important; }
        .react-tel-input .selected-flag { border-radius: 0.75rem 0 0 0.75rem !important; background: transparent !important; }
        .react-tel-input .selected-flag:hover, .react-tel-input .selected-flag:focus { background: rgba(249,115,22,0.06) !important; }
        .react-tel-input .country-list {
          position: absolute !important; z-index: 99999 !important; max-height: 200px !important;
          border-radius: 12px !important; box-shadow: 0 8px 32px rgba(0,0,0,0.15) !important;
          border: 1px solid #e5e7eb !important; margin-top: 4px !important; left: 0 !important;
        }
        .react-tel-input .country-list .country:hover { background: rgba(249,115,22,0.08) !important; }
        .react-tel-input .country-list .country.highlight { background: rgba(249,115,22,0.12) !important; }
      `}</style>
    </section>
  );
};

export default Contact;
