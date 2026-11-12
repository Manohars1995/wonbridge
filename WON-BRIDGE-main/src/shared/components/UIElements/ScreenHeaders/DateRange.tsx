import React, { useState, useRef, useEffect } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

type DateRangeType = {
  startDate: Date | null;
  endDate: Date | null;
  key: string;
};

const FloatingDatePicker = ({
  range,
  setRange
}: {
  range: DateRangeType[];
  setRange: React.Dispatch<React.SetStateAction<DateRangeType[]>>;
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [position, setPosition] = useState<"left" | "right">("left");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Auto-close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine left or right alignment to stay in screen
  useEffect(() => {
    if (showPicker && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const isNearRightEdge = window.innerWidth - rect.left < 330;
      setPosition(isNearRightEdge ? "right" : "left");
    }
  }, [showPicker]);

  return (
    <div className="relative w-fit h-[2.2rem] z-50">
      <button
        ref={buttonRef}
        onClick={() => setShowPicker((prev) => !prev)}
        className="px-3 flex items-center h-full rounded-lg text-md font-medium shadow text-black bg-[#d3d3d3] hover:bg-[#adb5bd] cursor-pointer"
      >
        {range[0].startDate && range[0].endDate ? (
          <>
            {range[0].startDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}{" "}
            -{" "}
            {range[0].endDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </>
        ) : (
          "[Start Date] - [End Date]"
        )}
      </button>

      {showPicker && (
        <div
          ref={pickerRef}
          className={`absolute top-11 ${
            position === "right" ? "right-0" : "left-0"
          } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg overflow-hidden shadow-xl`}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item: any) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={[
              {
                ...range[0],
                startDate: range[0].startDate || new Date(),
                endDate: range[0].endDate || addDays(new Date(), 3)
              }
            ]}
            showDateDisplay={true}
            months={1}
            direction="horizontal"
            className="custom-range"
          />
        </div>
      )}
    </div>
  );
};

export default FloatingDatePicker;
// this component renders a date range componenet from react-date-range
