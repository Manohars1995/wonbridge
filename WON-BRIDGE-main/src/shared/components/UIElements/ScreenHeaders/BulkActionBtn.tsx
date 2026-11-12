import { useEffect, useRef, useState } from "react";
import { TbDatabaseImport } from "react-icons/tb";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiArrowDown } from "react-icons/hi";

interface PropsVals {
  onDownload?: () => void;
  onImport?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BulkActionBtn = ({ onDownload, onImport }: PropsVals) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleDownload = () => {
    try {
      onDownload?.();
    } finally {
      setOpen(false);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files.length > 0) {
        onImport?.(e);
      }
    } finally {
      setOpen(false);
      // Reset so same file can be selected again
      e.target.value = "";
    }
  };

  return (
    <div ref={wrapperRef} className="relative inline-block h-full flex-1 z-50">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center h-full bg-[var(--btn-primary)] rounded-lg font-semibold py-0.5 px-1 cursor-pointer text-2xl hover:bg-[var(--btn-primaryhover)]"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <BiDotsVerticalRounded />
      </button>

      {/* Dropdown */}
      <div
        className={`
          absolute top-[123%] -right-2
          bg-[var(--background-default)]
          border border-[var(--secondary-main)]
          rounded-xl shadow-lg min-w-fit
          p-1.5 z-[1000]
          transition-all duration-200 ease-out
          ${
            open
              ? "opacity-100 visible translate-y-0 pointer-events-auto"
              : "opacity-0 invisible -translate-y-2 pointer-events-none"
          }
        `}
      >
        {/* Arrow */}
        <div className="absolute -top-1.5 right-4 w-3 h-3 bg-[var(--background-default)] border-l border-t border-[var(--secondary-main)] transform rotate-45 rounded-[2px]" />

        <div className="gap-1 flex flex-col text-[var(--primary-main)]">
          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download"
            className="group/down bg-gradient-to-r 
              from-[var(--btn-primary)] 
              to-[var(--accent-yellow)] 
              hover:from-[var(--btn-primaryhover)] 
              hover:to-[var(--accent-yellow-hover)] 
              flex items-center text-md w-full px-2 py-1 gap-2 rounded-lg cursor-pointer transition"
          >
            <span className="bg-[var(--background-default)] text-lg rounded-full p-0.5">
              <HiArrowDown className="transition group-hover/down:animate-bounce" />
            </span>
            Download
          </button>

          {/* Import */}
          <button
            type="button"
            onClick={handleImportClick}
            aria-label="Import"
            className="group/import bg-gradient-to-r 
              from-[var(--btn-primary)]
              to-[var(--dark-gold)] 
              hover:from-[var(--btn-primaryhover)] 
              hover:to-[var(--accent-yellow-hover)] 
              flex items-center text-md w-full px-2 py-1 gap-2 rounded-lg cursor-pointer transition"
          >
            <span className="bg-[var(--background-default)] text-lg rounded-full p-0.5">
              <TbDatabaseImport className="transition group-hover/import:animate-pulse" />
            </span>
            Import
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BulkActionBtn;
