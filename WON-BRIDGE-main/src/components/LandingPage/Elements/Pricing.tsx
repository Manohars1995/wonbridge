"use client";
import { useState } from "react";
import { useLanguage } from "./LanguageContext"; // ← CHANGED
import { formatPrice } from "./Currency"; // ← CHANGED

const plans = [
  {
    name: "Standard",
    subtitle: "For small mining operations",
    monthlyPriceINR: 9999, // ← CHANGED: was "9,999" string
    yearlyPriceINR: 99999, // ← CHANGED: was "99,999" string
    featured: false,
    features: [
      "Full Platform Access ",
      "1 Mining Site",
      "Up to 15 Users",
      "Standard Cloud Hosting & Storage",
      "Basic Onboarding Setup",
      "Business Hours Support",
    ],
  },
  {
    name: "Professional",
    subtitle: "For growing mining companies",
    monthlyPriceINR: 24999, // ← CHANGED
    yearlyPriceINR: 249999, // ← CHANGED
    featured: true,
    features: [
      "Full Platform Access ",
      "Up to 10 Mining Sites",
      "Up to 100 Users",
      "Priority Cloud Performance",
      "Real-time Operations & Faster Processing",
      "Priority Support (Faster SLA)",
      "Assisted Onboarding & Training",
    ],
  },
  {
    name: "Custom",
    subtitle: "For large scale & strategic deployments",
    monthlyPriceINR: null,
    yearlyPriceINR: null,
    featured: false,
    features: [
      "Full Platform Access ",
      "Unlimited Sites & Users ",
      "Dedicated / Private Cloud Deployment",
      "On-Premise Deployment Option",
      "24/7 Priority Support",
      "Dedicated Account Manager",
      "Custom Integrations (ERP / IoT / CCTV / Hardware)",
    ],
  },
];

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  const { language } = useLanguage(); // ← CHANGED

  return (
    <section id="pricing" className="py-16 bg-[#fdf8f3] overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-10">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-3">
            Pricing
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-500 mt-3">
            Choose the plan that best fits your operational needs.
          </p>

          {/* Toggle */}
          <div
            className="flex items-center justify-center mt-6 "
            // translate="no"
          >
            {" "}
            <div className="flex items-center bg-orange-50 rounded-full p-1 gap-1 border-1 border-orange-500">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${
                  !yearly
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${
                  yearly
                    ? "bg-orange-500 text-white shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 md:gap-6 items-stretch">
          {plans.map((plan) => {
            const priceINR = yearly
              ? plan.yearlyPriceINR
              : plan.monthlyPriceINR; 
            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 h-full max-sm:mx-3 ${
                  plan.featured
                    ? "border-2 border-orange-400 bg-white shadow-xl"
                    : "border border-gray-200 bg-white shadow-sm"
                }`}
              >
                {/* Popular badge */}
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                )}

                {/* Name & subtitle */}
                <div>
                  <h3
                    className={`text-xl font-bold ${plan.featured ? "text-orange-500" : "text-gray-900"}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
                </div>

                {/* Price */}
                <div>
                  {priceINR ? (
                    <div>
                      <p className="text-[11px] font-semibold text-gray-400 mb-0.5">
                        Starts from
                      </p>
                      <div className="flex items-end gap-1">
                        <span
                          className="font-extrabold leading-none text-4xl text-gray-900 "
                          translate="no"
                        >
                          {formatPrice(priceINR, language.code)}{" "}
                          {/* ← CHANGED: was hardcoded ₹ + price string */}
                        </span>
                        <span className="text-gray-400 text-sm mb-1">
                          {yearly ? "/year" : "/month"}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="font-extrabold leading-none text-4xl text-gray-900">
                        Custom
                      </span>
                    </div>
                  )}

                  {/* Yearly savings badge */}
                  <div className="h-5 mt-2">
                    {yearly && priceINR && (
                      <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 text-xs font-bold px-2.5 py-0.5 rounded-full border border-green-100">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Save up to 20%
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2.5 text-sm text-gray-700"
                    >
                      <span className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-2.5 h-2.5 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToContact}
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                    plan.featured
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Get Started
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
