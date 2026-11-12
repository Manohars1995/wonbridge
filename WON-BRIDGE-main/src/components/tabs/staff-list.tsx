import Card from "@/components/UIElements/Cards/card";

interface Staff {
  _id?: string;
  custom_id?: string;
  full_name?: string;
  email?: string | null;
  phone?: string | null;
  image?: string;
  assigned_shift?: string | null;
  role?: string;
}

interface StaffListProps {
  List: Staff[];
  view: (id: string, uId: string) => void;
}

const StaffList = ({ List, view }: StaffListProps) => {
  return (
    <>
      {List?.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {List.map((staff, index) => {
            const key = staff._id || staff.custom_id || `source-${index}`;
            return (
              <div key={key} className="cursor-pointer flex flex-1">
                <Card
                  id={key}
                  image={staff.image}
                  title={staff.full_name || ""}
                  sub1={{ label: "Email", value: staff.email || "" }}
                  sub2={{ label: "Phone", value: staff.phone || "" }}
                  sub3={{ label: "Shift", value: staff.assigned_shift || "" }}
                  view={() => view(staff.custom_id || "", staff._id || "")}
                  styles={
                    staff.role === "supervisor"
                      ? "bg-[var(--accent-yellow)] hover:bg-[var(--accent-yellow-hover)]"
                      : "bg-[var(--tile-bg)] hover:bg-[var(--tile-hover-bg)]"
                  }
                  imageAlt={staff.full_name || "staff"}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center flex justify-center items-center py-4 text-gray-500 h-[100%]">
          No staff found.
        </div>
      )}
    </>
  );
};

export default StaffList;
