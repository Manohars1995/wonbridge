import Card from "@/components/UIElements/Cards/card";
import React from "react";

interface Supplier {
  _id?: string;
  custom_id?: string;
  contact_person?: string;
  source_type?: string;
  phone?: string | null;
  image?: string;
  materials?: string[];
}

interface SuppliersListProps {
  List: Supplier[];
  view: (id: string, uId: string) => void;
}

const SuppliersList = ({ List, view }: SuppliersListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {List.map((source, index) => {
            const key = source._id || source.custom_id || `source-${index}`;
            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card
                  id={source._id || ""}
                  image={source.image}
                  view={() => view(source.custom_id || "", source._id || "")}
                  title={source.contact_person || ""}
                  sub1={{ label: "Source", value: source.source_type || "" }}
                  sub2={{ label: "Phone", value: source.phone || "" }}
                  sub3={{
                    label: "Materials",
                    value: source.materials?.join(", ") || ""
                  }}
                  imageAlt={source.contact_person || "supplier"}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          No suppliers found.
        </div>
      )}
    </>
  );
};

export default React.memo(SuppliersList);
