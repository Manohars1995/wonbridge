"use client";

// ✅ Put your actual download URLs here
const WINDOWS_DOWNLOAD_URL = import.meta.env.VITE_APP_EXE_DOWNLOAD_URL || "#";
const MACOS_DOWNLOAD_URL = import.meta.env.VITE_APP_MAC_DOWNLOAD_URL || "#";

const Desktop = () => {
  const handleWindowsDownload = () => {
    if (!WINDOWS_DOWNLOAD_URL || WINDOWS_DOWNLOAD_URL === "#") return;
    const link = document.createElement("a");
    link.href = WINDOWS_DOWNLOAD_URL;
    link.download = "WonBridge.exe";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleMacDownload = () => {
    if (!MACOS_DOWNLOAD_URL || MACOS_DOWNLOAD_URL === "#") return;
    const link = document.createElement("a");
    link.href = MACOS_DOWNLOAD_URL;
    link.download = "WonBridge.dmg";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    // ✅ id="desktop" so header download button scrolls here
    <section id="desktop" className="py-16 max-sm:py-10 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-18">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-500 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full w-fit mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"
                />
              </svg>
              Desktop Application
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4 max-md:text-center">
              Download the Desktop App <br />
              for <span className="text-orange-500">Smarter Operations</span>
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
              Access weighbridge data, manage vehicles, and generate reports
              faster with our powerful desktop application.
            </p>

            {/* Feature list */}
            <ul className="space-y-5 mb-10">
              {[
                {
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
                  title: "Fast & Efficient",
                  desc: "High performance for smooth operations",
                },
                {
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                  title: "Secure & Reliable",
                  desc: "Your data is safe with advanced security",
                },
                {
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
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  ),
                  title: "Offline Support",
                  desc: "Work without internet, sync when you're back",
                },
                {
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
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"
                      />
                    </svg>
                  ),
                  title: "Windows & macOS",
                  desc: "Compatible with all major desktop platforms",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 text-orange-500">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {item.title}
                    </p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* ✅ Download buttons — trigger actual file download */}
            <div className="flex flex-wrap gap-4 mb-6 max-md:justify-center">
              <button
                type="button"
                onClick={handleWindowsDownload}
                className="cursor-pointer flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors duration-200 shadow-md shadow-orange-200"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                </svg>
                Download for Windows
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleWindowsDownload}
                className="cursor-pointer flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm px-6 py-3.5 rounded-xl border border-gray-200 transition-colors duration-200 shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Download for macOS
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>

            {/* Bottom meta */}
            <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap justify-center">
              <span className="flex items-center gap-1">
                <svg
                  className="w-3.5 h-3.5 text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Version 2.0
              </span>
              <span className="w-1 h-1 rounded-full bg-orange-300" />
              <span>Free Updates</span>
              <span className="w-1 h-1 rounded-full bg-orange-300" />
              <span>Secure Installation</span>
            </div>
          </div>

          {/* RIGHT — Laptop image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Orange glow */}
            <div className="absolute w-[430px] h-[430px] bg-orange-200 rounded-full blur-3xl opacity-50 z-0" />

            {/* Dot pattern */}
            <div
              className="absolute top-5 right-5 w-32 h-32 opacity-40 z-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #f97316 1.5px, transparent 1.5px)",
                backgroundSize: "12px 12px",
              }}
            />

            {/* Laptop Image */}
            <img
              src="https://res.cloudinary.com/dtb4vozhy/image/upload/v1779799292/ChatGPT_Image_May_26_2026_06_11_16_PM_shasn7.png"
              alt="WON Bridge Desktop App"
              className="
      relative 
      z-10 
      w-[760px]
      max-w-full
      drop-shadow-[0_30px_60px_rgba(0,0,0,0.22)]
      hover:scale-105
      transition-all
      duration-500
    "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Desktop;
