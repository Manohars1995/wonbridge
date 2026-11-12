import Card3 from "@/components/UIElements/Cards/card-3";
import { type weighment } from "./utils";

interface TransitHistoryListProps {
  List: weighment[];
  view: (id: string, uId: string) => void;
  msg?: string;
}

const WeighmentHistoryList = ({ List, view, msg }: TransitHistoryListProps) => {
  console.log(List, "weighhjt list");
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 z-[100]">
          {List.map((weight, index) => {
            const key = weight.custom_id || `weigh-${index}`;

            const firstImage = Array.isArray(weight.images)
              ? weight.images[0]
              : typeof weight.images === "string"
              ? weight.images.split(",")[0]
              : undefined;

            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card3
                  id={weight.custom_id || ""}
                  uId={weight._id || ""}
                  view={() => view(weight.custom_id || "", weight?._id || "")}
                  image={firstImage}
                  custom_id={weight.custom_id}
                  trip_id={weight.trip_id}
                  weight={weight.weight}
                  timestamp={weight.timestamp}
                  status={weight.status}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          {msg || " No weighment history found."}
        </div>
      )}
    </>
  );
};

export default WeighmentHistoryList;
