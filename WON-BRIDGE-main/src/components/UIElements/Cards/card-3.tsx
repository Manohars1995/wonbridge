import { PiTruckTrailer } from "react-icons/pi";
import { formatDateTime } from "@/shared/util/helper-functions";

interface CardProps {
  id: string;
  uId: string;
  view: (id: string) => void;

  image?: string;
  custom_id?: string;
  trip_id?: string;
  weight?: string;
  timestamp?: string;
  status?: string;
}

const Card3 = ({
  id,
  uId,
  view,
  image,
  custom_id,
  trip_id,
  weight,
  timestamp,
  status
}: CardProps) => {
  return (
    <div
      onClick={() => view(id)}
      className="bg-[var(--tile-bg)] hover:bg-[var(--tile-hover-bg)] relative w-72 h-40 flex-1 flex flex-col gap-2 rounded-lg shadow p-3 cursor-pointer"
    >
      <div className="flex gap-3">
        {/* Image / Icon */}
        <div className="w-25 h-18 bg-[var(--background-secondary)] rounded-lg flex items-center justify-center overflow-hidden">
          <span className="text-5xl text-[var(--tile-text)]">
            <PiTruckTrailer />
          </span>
        </div>

        {/* Basic Info */}
        <div className="flex flex-col w-full text-[var(--tile-text)]">
          <span className="font-bold uppercase">
            {custom_id || "Unknown ID"}
          </span>

          <p className="text-xs">
            Trip ID: <span className="font-semibold">{trip_id || "--"}</span>
          </p>

          <p className="text-xs flex items-center mt-1">
            Status:{" "}
            <span
              className={`font-semibold ml-1 ${
                status === "PENDING" ? "text-yellow-500" : "text-green-500"
              }`}
            >
              {status || "N/A"}
            </span>
          </p>
        </div>
      </div>

      <hr className="my-2 opacity-40" />

      {/* Weight + Timestamp Section */}
      <div className="flex justify-between text-sm text-[var(--tile-text)]">
        <p className="font-semibold">{weight ? `${weight} KG` : "No Weight"}</p>
        <p className="text-xs">{formatDateTime(timestamp)}</p>
      </div>
    </div>
  );
};

export default Card3;
