import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageContext";

const languages = [
  { code: "en", label: "EN - English", flag: "🇺🇸" },
  { code: "es", label: "ES - Spanish", flag: "🇪🇸" },
  { code: "fr", label: "FR - French", flag: "🇫🇷" },
  { code: "ar", label: "AR - Arabic", flag: "🇸🇦" },
  { code: "pt", label: "PT - Portuguese", flag: "🇵🇹" },
  { code: "de", label: "DE - German", flag: "🇩🇪" },
  { code: "hi", label: "HI - Hindi", flag: "🇮🇳" },
  { code: "ja", label: "JA - Japanese", flag: "🇯🇵" },
  { code: "ru", label: "RU - Russian", flag: "🇷🇺" },
  { code: "zh-CN", label: "ZH - Chinese", flag: "🇨🇳" },
];

const GoogleTranslate = () => {
  const { language: selected, setLanguage: setSelected } = useLanguage(); // ← CHANGED: shared context instead of local state
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ← CHANGED: clears Google Translate's cookie so it can't auto-restore
  // a previously selected language on refresh. Forces English every load.
  const resetToEnglish = () => {
    const hostname = window.location.hostname;
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname};`;
    setSelected(languages[0]);
  };

  useEffect(() => {
    resetToEnglish(); // ← CHANGED: run on every mount

    if (!document.getElementById("google_translate_element")) {
      const div = document.createElement("div");
      div.id = "google_translate_element";
      div.style.display = "none";
      document.body.appendChild(div);
    }

    if (!document.getElementById("gt-script")) {
      const script = document.createElement("script");
      script.id = "gt-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,ar,pt,de,hi,ja,ru,zh-CN",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang) => {
    setSelected(lang);
    setOpen(false);

    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }} translate="no"> {/* ← CHANGED: protect labels from Google Translate DOM rewrite */}
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          fontSize: 13,
          fontWeight: 500,
          color: "#4b5563",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "6px 8px",
          borderRadius: 8,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#111")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
      >
        <svg
          width="16" height="16"
          fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
          />
        </svg>
        <span>{selected.code.toUpperCase()}</span>
        <svg
          width="12" height="12"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
          style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            width: 200,
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            zIndex: 9999,
            overflow: "hidden",
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 16px",
                fontSize: 13,
                textAlign: "left",
                cursor: "pointer",
                border: "none",
                background:
                  selected.code === lang.code ? "#eff6ff" : "transparent",
                color: selected.code === lang.code ? "#2563eb" : "#374151",
                fontWeight: selected.code === lang.code ? 600 : 400,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                if (selected.code !== lang.code)
                  e.currentTarget.style.background = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                if (selected.code !== lang.code)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;