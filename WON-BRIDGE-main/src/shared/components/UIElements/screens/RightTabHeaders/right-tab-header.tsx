import { IoMdClose } from "react-icons/io";
import SwitchToggle from "@/components/UI/Toggle-switch/Switch";

interface propVals {
  children: React.ReactNode;
  isToggleActive?: boolean;
  checked?: boolean;
  onClose: () => void;
  toggleStatus?: (val: boolean, isValid: boolean) => void;
}

const RightTabHeader = ({
  children,
  isToggleActive = false,
  checked = false,
  onClose,
  toggleStatus
}: propVals) => {
  const closeHandler = () => {
    onClose();
  };

  return (
    <div className="flex justify-between h-8 mb-3 z-[999] ">
      <h1 className="text-lg whitespace-nowrap overflow-hidden text-ellipsis font-semibold w-1/2">
        {children}
      </h1>
      <div className="flex items-center">
        {isToggleActive && (
          <SwitchToggle
            checked={checked}
            setChecked={(val: boolean) => toggleStatus?.(val, true)}
          />
        )}

        <button
          onClick={closeHandler}
          className="cursor-pointer flex items-center rounded-lg float-right text-xl p-1 bg-[var(--btn-cancel)] ml-4"
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
export default RightTabHeader;
