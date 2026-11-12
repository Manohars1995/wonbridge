"use client";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "WON Bridge has transformed our operations. Real-time data, accurate weighing and easy reporting have improved our productivity and transparency.",
    name: "Ramesh Kumar",
    role: "Operations Head, Superior Mining",
  },
  {
    quote:
      "The automation features saved us countless hours of manual data entry. Our accuracy rate has never been this high before.",
    name: "Priya Sharma",
    role: "Fleet Manager, Bharat Aggregates",
  },
  {
    quote:
      "Excellent support team and a very intuitive platform. Setting up across 5 locations was seamless with WON Bridge.",
    name: "Arvind Nair",
    role: "Director, Nair Cement Works",
  },
  {
    quote:
      "Cloud-based access means I can monitor all my sites from anywhere. It's exactly what we needed for our growing operations.",
    name: "Sunita Reddy",
    role: "CEO, Reddy Stone Industries",
  },
];

const plans = [
  {
    name: "Basic",
    subtitle: "For small operations",
    price: "$299",
    featured: false,
    features: ["1 Weighbridge", "Up to 1,000 trips/mo", "Basic Reports", "Email Support"],
  },
  {
    name: "Pro",
    subtitle: "For growing businesses",
    price: "$599",
    featured: true,
    features: ["Up to 3 Weighbridges", "Unlimited trips", "Advanced Analytics", "Cloud Backup", "Priority Support"],
  },
  {
    name: "Enterprise",
    subtitle: "For large scale operations",
    price: "Custom",
    featured: false,
    features: [
      "Unlimited Weighbridges",
      "Custom Integrations",
      "Dedicated Manager",
      "On-premise option",
      "24/7 Phone Support",
    ],
  },
];

const Overview = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-8">What Our Customers Say</p>

          <div className="text-orange-200 mb-6">
            <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <blockquote className="text-xl sm:text-2xl font-semibold text-gray-800 leading-relaxed mb-8">
            "{testimonials[activeSlide].quote}"
          </blockquote>

          <p className="font-bold text-gray-900">{testimonials[activeSlide].name}</p>
          <p className="text-sm text-gray-500 mt-1">{testimonials[activeSlide].role}</p>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`rounded-full transition-all ${
                  i === activeSlide ? "w-4 h-3 bg-orange-500" : "w-3 h-3 bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 bg-[#fdf8f3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 mt-3">Choose the plan that best fits your operational needs.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-7 flex flex-col gap-6 ${
                  plan.featured
                    ? "border-2 border-orange-400 bg-white shadow-xl"
                    : "border border-gray-200 bg-white shadow-sm"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                      Popular
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{plan.subtitle}</p>
                </div>

                <div className="flex items-end gap-1">
                  <span className={`font-extrabold leading-none ${plan.price === "Custom" ? "text-4xl" : "text-4xl"} text-gray-900`}>
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" && <span className="text-gray-400 text-sm mb-1">/mo</span>}
                  {plan.price === "Custom" && <span className="text-gray-400 text-sm mb-1">/mo</span>}
                </div>

                <ul className="space-y-3">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                      <span className="w-5 h-5 rounded-full border-2 border-orange-400 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-xl text-sm font-bold transition-colors ${
                    plan.featured
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;