import Header from "./Elements/Header";
import Hero from "./Elements/Hero";
import StatsBar from "./Elements/StatsBar";
import Footer from "./Elements/Footer";
import Features from "./Elements/Features";
import WhatWeOffer from "./Elements/WhatWeOffer";
import Desktop from "./Elements/Desktop";
import Testimonials from "./Elements/Testimonials";
import Pricing from "./Elements/Pricing";
import Contact from "./Elements/Contact";
import { LanguageProvider } from "./Elements/LanguageContext"; // ← CHANGED: adjust path to wherever you place the file
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Page = () => {
  const location = useLocation();

  const PATH_TO_SECTION: Record<string, string> = {
    "/home": "home",
    "/features": "features",
    "/pricing": "pricing",
    "/contact": "contact",
  };

  useEffect(() => {
    const sectionId = PATH_TO_SECTION[location.pathname] ?? "home";
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const timer = setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 56;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <LanguageProvider> {/* ← CHANGED: wraps entire page */}
      <div className="bg-white rounded-xl pt-14 pb-3">
        <Header />
        <div id="home">
          <Hero />
        </div>
        <StatsBar />
        <div id="features">
          <Features />
        </div>
        <WhatWeOffer />
        <Desktop />
        <Testimonials />
        <div id="pricing">
          <Pricing />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Page;