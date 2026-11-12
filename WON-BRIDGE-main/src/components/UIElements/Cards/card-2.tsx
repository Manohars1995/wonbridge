import { PiTruckTrailer } from "react-icons/pi";

import { formatDateTime } from "@/shared/util/helper-functions";

interface CardProps {
  id: string;
  view: (id: string) => void;
  image?: string;
  title?: string;
  sub1?: { label?: string; value?: string };
  sub2?: { label?: string; value?: string };
  inData?: { weight?: string; date?: string };
  outData?: { weight?: string; date?: string };
  styles?: string;
}

const Card2 = ({
  id,
  view,
  image,
  title,
  sub1,
  sub2,
  inData,
  outData,
  styles = "bg-[var(--tile-bg)] hover:bg-[var(--tile-hover-bg)]"
}: CardProps) => {
  return (
    <div
      onClick={() => view(id)}
      className={`${styles} relative w-72 h-40 flex flex-col flex-1 gap-2 rounded-lg shadow p-2 cursor-pointer`}
    >
      <div>
        <div className="flex gap-2">
          <div className="w-19 h-19 bg-[var(--background-secondary)] shrink-0 rounded-lg flex items-center justify-center overflow-hidden">
            {image ? (
              <img
                src={image || ""}
                alt="Supervisor"
                className="object-cover h-full w-full "
              />
            ) : (
              <span className="text-5xl font-bold text-[var(--tile-text)]">
                <PiTruckTrailer />
              </span>
            )}
          </div>
          <div className="flex flex-col text-[var(--tile-text)] w-full min-w-0">
            <span className="font-bold italic">{title}</span>
            <p className="text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              {sub1?.label}: {sub1?.value || "N/A"}
            </p>

            <p className="text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0 mt-1">
              {sub2?.label}: {sub2?.value + " KG" || "N/A"}
            </p>
          </div>
        </div>

        <hr className="my-2 text-[#ccc] " />

        <div className=" ">
          <div className="flex justify-between">
            <p className="text-xs text-center border-r whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              IN
            </p>

            <p className="text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              OUT
            </p>
          </div>

          <div className="flex justify-between mt-1">
            <p className="text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              {inData?.weight + " KG" || "N/A"}
            </p>

            <p className="text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              {outData?.weight + " KG" || "N/A"}
            </p>
          </div>
          

          <div className="flex justify-between">
            <p className="text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              {formatDateTime(inData?.date)}
            </p>
            <p className="text-xs text-center whitespace-nowrap overflow-hidden text-ellipsis w-full min-w-0">
              {formatDateTime(outData?.date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
