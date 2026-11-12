import { useState } from "react";

/* ── Terminal data ─────────────────────────────────────────────────────────── */
const terminals = [
  {
    id: 0,
    label: "Quick Setup",
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779790929/ChatGPT_Image_May_26_2026_03_34_26_PM_viyvrv.png",
  },
  {
    id: 1,
    label: "Operation & Tracking",
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779790929/ChatGPT_Image_May_26_2026_02_27_20_PM_hjzksq.png",
  },
  {
    id: 2,
    label: "Monitor & Manage",
    image:
      "https://res.cloudinary.com/dtb4vozhy/image/upload/v1779790929/ChatGPT_Image_May_26_2026_01_41_04_PM_tila3y.png",
  },
];

/* ── Accordion ─────────────────────────────────────────────────────────────── */
const TerminalAccordion = () => {
  const [active, setActive] = useState(0);

  return (
    <div
      className="flex gap-2.5 w-full h-full"
      style={{ minHeight: "clamp(300px, 45vw, 480px)" }}
      onMouseLeave={() => setActive(0)}
    >
      {terminals.map((t) => {
        const isActive = active === t.id;
        return (
          <div
            key={t.id}
            onMouseEnter={() => setActive(t.id)}
            className="relative overflow-hidden rounded-[18px] cursor-pointer flex-shrink-0"
            style={{
              flex: isActive ? "1 1 0%" : "0 0 62px",
              transition: "flex 0.5s cubic-bezier(0.77, 0, 0.18, 1)",
              background: "#1a1a1a",
            }}
          >
            <img
              src={t.image}
              alt={t.label}
              className="absolute inset-0"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill", 
                transform: isActive ? "scale(1)" : "scale(1.8)",
                transformOrigin: "center center",
                transition:
                  "transform 0.6s cubic-bezier(0.77, 0, 0.18, 1), filter 0.4s ease",
                filter: isActive ? "brightness(1)" : "brightness(0.45)",
              }}
            />
            {/* Overlay — only on inactive */}
            <div
              className="absolute inset-0"
              style={{
                background: "rgba(0,0,0,0.3)",
                opacity: isActive ? 0 : 1,
                transition: "opacity 0.4s ease",
              }}
            />

            {/* Vertical label — inactive only */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: isActive ? 0 : 1,
                transition: "opacity 0.3s ease",
                pointerEvents: isActive ? "none" : "auto",
              }}
            >
              <span
                className="text-white font-bold tracking-widest uppercase text-center"
                style={{
                  fontSize: "clamp(11px, 1vw, 15px)",
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.13em",
                }}
              >
                {t.label}
              </span>
            </div>

            {/* Bottom content — active only */}
            <div
              className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              {/* <h3 className="text-white font-extrabold text-sm sm:text-base md:text-lg xl:text-2xl 2xl:text-3xl mb-1.5 tracking-wide">
                {t.title}
              </h3> */}
              {/* <p className="text-white/75 text-[11px] sm:text-xs md:text-sm xl:text-md 2xl:text-lg leading-relaxed">
                {t.description}
              </p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ── Helpers ───────────────────────────────────────────────────────────────── */
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const featurePills = [
  { label: "Real time CCTV", path: "M13 10V3L4 14h7v7l9-11h-7z" },
  {
    label: "Multi-site control",
    path: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    label: "Vehicle Management",
    path: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 01-2 2h-2",
  },
  {
    label: "AI Alerts & Cloud Backup",
    path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
];

/* ── Hero ──────────────────────────────────────────────────────────────────── */
const Hero = () => {
  return (
    <section id="home" className="bg-white">
      <style>{`
        .terminal-right { height: clamp(320px, 45vw, 480px); }
        @media (min-width: 1536px) {
          .terminal-right { height: 550px; }
        }
      `}</style>

      <div className="w-full flex items-center py-10 lg:py-0 lg:h-[calc(100vh-68px)] 2xl:h-[75vh] min-h-[500px]">
        <div className="w-full max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-12 lg:py-12">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8 xl:gap-14">
            {/* ── LEFT ── */}
            <div className="flex-1 max-w-5xl w-full">
              <p className="flex items-center gap-2 text-xs text-gray-400 mb-2 md:mb-6 font-medium tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-orange-500 inline-block animate-pulse" />
                The World's Leading Mining Operations Platform
              </p>

              <h1 className="font-extrabold leading-[1.08] tracking-tight mb-2 md:mb-6 text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl">
                <span className="text-gray-900 block">Weigh Every Load.</span>
                <span className="text-orange-500 block">
                  Drive Every Decision.
                </span>
              </h1>

              <p className="text-gray-500 text-xs sm:text-xs md:text-md lg:text-[15px] 2xl:text-xl leading-relaxed mb-5 md:mb-9 max-w-md">
                Monitor weighbridges, vehicles, CCTV surveillance, operator
                activity, alerts, and site operations through one centralized
                system built for modern mining.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-5 md:mb-9">
                <button
                  onClick={() => scrollTo("contact")}
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold px-6 py-3 2xl:px-8 2xl:py-4 rounded-lg flex items-center gap-2 transition-all text-sm 2xl:text-base shadow-lg shadow-orange-200"
                >
                  Book a Demo
                  <svg
                    className="w-4 h-4 2xl:w-5 2xl:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center lg:justify-start">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm 2xl:text-base text-gray-500">
                  {featurePills.map(({ label, path }) => (
                    <span key={label} className="flex items-center gap-1.5">
                      <svg
                        className="w-4 h-4 2xl:w-5 2xl:h-5 text-orange-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={path}
                        />
                      </svg>
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div className="terminal-right flex-1 w-full max-w-2xl lg:max-w-none">
              <TerminalAccordion />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
