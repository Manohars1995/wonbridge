import Card2 from "@/components/UIElements/Cards/card-2";

import { type Transit } from "./utils";

interface TransitHistoryListProps {
  List: Transit[];
  view: (id: string, uId: string) => void;
}

const TransitHistoryList = ({ List, view }: TransitHistoryListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 z-[100]">
          {List.map((transit, index) => {
            const key = transit._id || transit.custom_id || `transit-${index}`;
            const inWeight = transit.in_entry?.weight || 0;
            const outWeight = transit.out_entry?.weight || 0;
            const products = [
              transit?.in_entry?.product,
              transit?.out_entry?.product
            ].filter(Boolean);

            const productString = products.join(", ");

            const GrossWt = Math.abs(inWeight - outWeight).toString();

            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card2
                  id={key}
                  view={() => view(transit.custom_id || "", transit._id || "")}
                  title={transit.vehicle_no || "UNKNOWN"}
                  sub1={{ label: "Material", value: productString || "--" }}
                  sub2={{ label: "Gross", value: GrossWt }}
                  inData={{
                    weight: inWeight.toString(),
                    date: transit.in_entry?.timestamp ?? undefined
                  }}
                  outData={{
                    weight: outWeight.toString(),
                    date: transit.out_entry?.timestamp ?? undefined
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          No transit history found.
        </div>
      )}
    </>
  );
};

export default TransitHistoryList;
