import { useState, useEffect } from "react";
import { LiaSignInAltSolid } from "react-icons/lia";
import { IoCloudDownloadSharp } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate"

const navLinks = [
  { label: "Home", id: "home", path: "/" },
  { label: "Features", id: "features", path: "/features" },
  { label: "Pricing", id: "pricing", path: "/pricing" },
  { label: "Contact", id: "contact", path: "/contact" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 56;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const Header = () => {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-56px 0px -60% 0px", threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ✅ Scrolls to desktop section
  const handleDownloadClick = () => {
    scrollTo("desktop");
    setMenuOpen(false);
  };

  const HamburgerIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      {/* ✅ notranslate added so header never gets translated */}
      <header  className=" fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="h-14 max-w-8xl mx-auto flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-11 h-11 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dtb4vozhy/image/upload/v1778135133/WonBridge_-logo_lnzdrc.png"
                alt="WON Bridge Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-gray-900 text-[17px] tracking-tight" translate="no">
              WON Bridge
            </span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ label, id, path }) => (
              <button
                key={id}
                onClick={() => { navigate(path); setActiveId(id); }}
                className={`text-[15.5px] px-4 py-1.5 rounded-lg font-medium transition-colors ${
                  activeId === id
                    ? "text-orange-500"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop action buttons — ✅ GoogleTranslate added */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <GoogleTranslate />
            <button
              type="button"
              title="Download Desktop App"
              onClick={handleDownloadClick}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <IoCloudDownloadSharp className="text-[17px]" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium shadow-sm transition-colors"
            >
              Sign in
              <LiaSignInAltSolid className="text-[24px]" />
            </button>
          </div>

          {/* Tablet header — ✅ GoogleTranslate added */}
          <div className="hidden md:flex lg:hidden items-center gap-2 flex-shrink-0">
            <GoogleTranslate />
            <button
              type="button"
              title="Download Desktop App"
              onClick={handleDownloadClick}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50 transition-colors"
            >
              <IoCloudDownloadSharp className="text-[15px]" />
            </button>
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-medium transition-colors"
            >
              Sign in
              <LiaSignInAltSolid className="text-[13px]" />
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>

          {/* Mobile only: hamburger when closed, language + close when open */}
          <div className="md:hidden flex items-center gap-1">
            {menuOpen ? (
              <>
                 <GoogleTranslate />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <CloseIcon />
                </button>
              </>
            ) : (
              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <HamburgerIcon />
              </button>
            )}
          </div>
        </div>

        {/* Dropdown */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 pt-3 pb-2">
              {navLinks.map(({ label, id, path }) => (
                <button
                  key={id}
                  onClick={() => { navigate(path); setActiveId(id); setMenuOpen(false); }}
                  className={`w-full text-left text-[14px] font-medium px-3 py-2 rounded-lg transition-colors ${
                    activeId === id
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {activeId === id && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 mb-0.5 align-middle" />
                  )}
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile: Download + Sign in */}
            <div className="md:hidden px-3 pt-2 pb-4 border-t border-gray-100 mt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadClick}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full border border-orange-400 text-orange-500 text-[13px] font-medium hover:bg-orange-50 transition-colors"
                >
                  <IoCloudDownloadSharp className="text-[14px] flex-shrink-0" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-medium shadow-sm transition-colors"
                >
                  Sign in
                  <LiaSignInAltSolid className="text-[14px] flex-shrink-0" />
                </button>
              </div>
            </div>

            <div className="hidden md:block pb-2" />
          </div>
        )}
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;