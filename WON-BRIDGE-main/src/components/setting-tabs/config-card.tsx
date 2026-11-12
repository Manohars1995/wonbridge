import type { JSX } from "react";

interface ConfigTabsProps {
  details: {
    id: string;
    image?: string;
    title: string;
    description: string;
    icon: JSX.Element;
  };
  edit: (id: string) => void;
}

const ConfigTabs = ({ details, edit }: ConfigTabsProps) => {
  return (
    <div
      onClick={() => edit(details.id)}
      className="w-72 h-fit flex flex-col flex-1 justify-center gap-2 bg-[var(--tile-bg)] rounded-lg shadow p-2 cursor-pointer"
    >
      <div className="flex gap-2">
        <div className="bg-white text-[#ccc] w-24 h-24 shrink-0 text-7xl flex items-center justify-center rounded-lg">
          {details.icon}
        </div>
        <div className="flex flex-col text-white">
          <span className="font-bold italic">{details.title}</span>
          <p className="line-clamp-3 text-sm">{details.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigTabs;
