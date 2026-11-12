"use client";
import { useState } from "react";

const industries = [
  {
    id: "metal-mining",
    label: "Metal",
    priority: 1,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
        />
      </svg>
    ),
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_02_43_37_PM_yt7uyt.png",
    content: {
      heading: "Metal Mining",
     description:
  "Metal mining operations with efficient material tracking, dispatch control, and improved operational visibility.",      points: [
        "Iron Ore Mining Operations",
        "Copper Mining & Processing",
        "Gold & Precious Metal Mining",
        "Zinc & Nickel Extraction",
        "Real-Time Material Tracking",
        "Automated Dispatch Monitoring",
      ],
    },
  },

  {
    id: "aggregates-quarrying",
    label: "Aggregates & Quarrying",
    priority: 2,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_02_47_31_PM_oy6ifn.png",
    content: {
      heading: "Aggregates & Quarrying",
     description:
  "Aggregate and quarry operations with accurate load tracking, weighbridge monitoring, and streamlined dispatch management.",     points: [
        "Sand & Gravel Mining",
        "Aggregate Production Management",
        "Stone Quarrying Operations",
        "Bulk Material Dispatch Tracking",
        "Vehicle Entry & Exit Automation",
        "Load Verification & Reporting",
      ],
    },
  },

  {
    id: "construction-materials",
    label: "Construction",
    priority: 3,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"
        />
      </svg>
    ),
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_02_49_08_PM_ydr9jb.png",
    content: {
      heading: "Construction Materials",
      description:
  "Automation solutions for construction material industries with efficient material tracking, dispatch management, and real-time operational visibility.",
      points: [
        "Limestone Mining & Transport",
        "Dolomite Material Operations",
        "Granite Quarry & Dispatch Management",
        "Marble Mining & Processing",
        "Construction Supply Chain Tracking",
        "Real-Time Inventory Monitoring",
      ],
    },
  },

  {
    id: "industrial-minerals",
    label: "Minerals",
    priority: 4,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 10.101c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),

    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_03_49_09_PM_wkcudh.png",
    content: {
      heading: "Industrial Minerals",
     description:
  "Industrial minerals used in cement, agriculture, ceramics, chemicals, and manufacturing industries with efficient material handling and transportation management.",
      points: [
        "Cement Raw Material Mining",
        "Industrial Mineral Extraction",
        "Bauxite Mining Operations",
        "Gypsum & Phosphate Handling",
        "Automated Dispatch & Weighing",
        "Production & Inventory Reporting",
      ],
    },
  },

  {
    id: "mining-quarries",
    label: "Energy",
    priority: 5,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_03_04_12_PM_ne9wbs.png",
    content: {
      heading: "Mining & Quarries",
     description:
  "Mining and quarry operations for coal, stone, and mineral extraction with efficient vehicle tracking, weighing, and dispatch management.",      points: [
        "Coal Mining Operations",
        "Stone & General Mining Activities",
        "Automated Vehicle Monitoring",
        "Material Dispatch Management",
        "Centralized Operations Dashboard",
        "Compliance & Audit Reporting",
      ],
    },
  },

  {
    id: "strategic-resources",
    label: "Rare Earth",
    priority: 6,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 10.101c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779792317/ChatGPT_Image_May_26_2026_03_35_08_PM_fgz6lq.png",
    content: {
      heading: "Strategic Resources",
     description:
  "Rare earth and uranium mining operations supporting renewable energy, advanced technologies, and global resource security.",      points: [
        "Rare Earth Mining Operations",
        "Uranium Mining & Monitoring",
        "Critical Mineral Resource Tracking",
        "High-Security Dispatch Systems",
        "Centralized Operational Visibility",
        "Advanced Compliance Management",
      ],
    },
  },
];

const WhatWeOffer = () => {
  const [active, setActive] = useState(industries[0].id);

  const activeIndustry =
    industries.find((i) => i.id === active) || industries[0];

  return (
    <section id="industries" className="py-16 bg-white overflow-x-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest text-orange-500 uppercase mb-3">
            Industries We Serve
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Built for Mining. Trusted By Global Leaders.
          </h2>
        </div>

        {/* Tab bar */}
        <div className="flex gap-2 mb-10 border-b border-gray-100 pb-4 overflow-x-auto scrollbar-hide max-w-4xl mx-auto w-full">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActive(ind.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all flex-shrink-0 ${
                active === ind.id
                  ? "border-orange-400 text-orange-500 bg-orange-50"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span
                className={
                  active === ind.id ? "text-orange-500" : "text-gray-400"
                }
              >
                {ind.icon}
              </span>
              {ind.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-items-center max-w-5xl mx-auto w-full">
          {/* Left: Text */}
          <div className="w-full">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">
              {activeIndustry.content.heading}
            </h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              {activeIndustry.content.description}
            </p>
            <ul className="space-y-3">
              {activeIndustry.content.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-3 h-3 text-orange-500"
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
                  <span className="text-sm text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Fixed-size image panel */}
          <div className="w-full max-w-md mx-auto">
            {/* 
              Fixed container: always h-72 (288px), never grows or shrinks.
              overflow-hidden + rounded-2xl clips the image neatly.
            */}
            <div className="w-full h-72 rounded-2xl overflow-hidden relative bg-orange-50">
              <img
                key={activeIndustry.id}
                src={activeIndustry.image}
                alt={activeIndustry.content.heading}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  // Fallback: show the icon card if image fails to load
                  e.currentTarget.style.display = "none";
                  const fallback = e.currentTarget
                    .nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              {/* Fallback icon — hidden by default, shown if image 404s */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 items-center justify-center flex-col text-center p-8"
                style={{ display: "none" }}
              >
                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-500 scale-150">
                    {activeIndustry.icon}
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  {activeIndustry.content.heading}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Trusted by leading operations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
