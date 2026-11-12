import { TbReportAnalytics } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";

import Card from "@/components/UIElements/Cards/card";
import React from "react";
interface Admin {
  _id?: string;
  custom_id?: string;
  company_name?: string | null | undefined;
  email?: string;
  phone?: string;
  image?: string;
  ownership_type?: string;
}

interface AdminListProps {
  List: Admin[];
  view: (id: string, uId: string) => void;
  onTransit: (id?: string) => void;
  onWeighments: (id?: string) => void;
}

const AdminList = ({ List = [], view, onTransit, onWeighments }: AdminListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {List.map((admin, index) => {
            const key = admin._id || admin.custom_id || `source-${index}`;
            return (
              <div key={key} className="cursor-pointer flex">
                <Card
                  id={key}
                  image={admin.image}
                  view={() => view(admin.custom_id || "", admin._id || "")}
                  title={admin.company_name}
                  sub1={{ label: "Email", value: admin.email }}
                  sub2={{ label: "Phone", value: admin.phone }}
                  sub3={{
                    label: "Ownership Type",
                    value: admin.ownership_type
                  }}
                  imageAlt={admin?.company_name || "admin"}
                  btns={[
                    {
                      icon: <TbReportAnalytics />,
                      onClick: () => onWeighments(admin._id),
                      tooltip: "weighments"
                    },
                    {
                      icon: <GrTransaction />,
                      onClick: () => onTransit(admin._id),
                      tooltip: "Transits"
                    }
                  ]}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-full">
          No admins found.
        </div>
      )}
    </>
  );
};

export default React.memo(AdminList);
