import React from "react";

type TooltipProps = {
  content: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative inline-flex group">
      {/* Trigger element */}
      {children}

      {/* Tooltip box */}
      <span className="absolute z-10 bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-semibold bg-[#191919] text-[#d5ad72] px-2 py-1 rounded opacity-0 invisible translate-y-1 transition-all group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
        {content}
        {/* Tooltip arrow */}
        <span className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-[5px] border-t-[#191919]" />
      </span>
    </div>
  );
};

export default Tooltip;
