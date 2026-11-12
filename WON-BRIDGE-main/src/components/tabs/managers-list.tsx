import Card from "@/components/UIElements/Cards/card";
import React from "react";

interface Manager {
  _id?: string;
  custom_id?: string;
  full_name?: string;
  email?: string | null;
  phone?: string | null;
  image?: string;
  assigned_shift?: string | null;
}

interface ManagersListProps {
  List: Manager[];
  loading?: boolean;
  view: (id: string, uId: string) => void;
}

const ManagersList = ({ List, view }: ManagersListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {List.map((manager, index) => {
            const key = manager._id || manager.custom_id || `source-${index}`;
            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card
                  id={key}
                  image={manager.image}
                  view={() => view(manager.custom_id || "", manager._id || "")}
                  title={manager.full_name || ""}
                  sub1={{ label: "Email", value: manager.email || "" }}
                  sub2={{ label: "Phone", value: manager.phone || "" }}
                  sub3={{
                    label: "Assigned Shift",
                    value: manager.assigned_shift || ""
                  }}
                  imageAlt={manager.full_name || 'manger'}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          No managers found.
        </div>
      )}
    </>
  );
};

export default React.memo(ManagersList);
