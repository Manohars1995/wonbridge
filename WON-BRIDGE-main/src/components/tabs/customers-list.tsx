import Card from "@/components/UIElements/Cards/card";
import React from "react";

interface Customer {
  _id?: string;
  custom_id?: string;
  contact_person?: string;
  email?: string | null;
  phone?: string | null;
  image?: string;
  material_types?: string[];
}

interface CustomersListProps {
  List: Customer[];
  view: (id: string, uId: string) => void;
}

const CustomersList = ({ List, view }: CustomersListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {List.map((customer, index) => {
            const key = customer._id || customer.custom_id || `source-${index}`;
            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card
                  id={key}
                  image={customer.image}
                  view={() =>
                    view(customer.custom_id || "", customer._id || "")
                  }
                  title={customer.contact_person}
                  sub1={{ label: "Email", value: customer.email || "" }}
                  sub2={{ label: "Phone", value: customer.phone || "" }}
                  sub3={{
                    label: "Material",
                    value: customer.material_types?.join(", ") || ""
                  }}
                  imageAlt={customer.contact_person || "customers"}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          No customers found.
        </div>
      )}
    </>
  );
};

export default React.memo(CustomersList);
