import React from "react";

interface DashTail1Props {
  children?: React.ReactNode;
  title: string;
  value: string | number;
}

const DashTail1 = ({ children, title, value }: DashTail1Props) => {
  return (
    <div className="py-1 pl-3 bg-black/10 flex items-center gap-5 min-h-22 rounded-xl ">
      <div className="w-15 h-15 text-5xl flex justify-center items-center border border-black/10 rounded-full ">
        {children}
      </div>
      <div className="flex flex-col ">
        <h1 className="text-xl font-bold text-black/70">{title}</h1>
        <h3 className="text-2xl font-bold text-black">{value}</h3>
      </div>
    </div>
  );
};

export default DashTail1;
