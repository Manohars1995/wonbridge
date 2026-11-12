import { useContext, useEffect, useState } from "react";
import { InputTag, BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import { savePrinterMeta } from "@/services/admin/admin";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { showToast } from "@/components/UI/toast";

interface MetaProps {
  short_address: string;
  weighbridgecap: string;
}

const PrinterForm = ({ settings }: { settings: MetaProps }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [printerMeta, setPrinterMeta] = useState({
    short_address: { value: "", isValid: true },
    weighbridgecap: { value: "", isValid: true }
  });
  const { userID } = useContext(WonBridgeContext);

  useEffect(() => {
    if (settings) {
      setPrinterMeta({
        short_address: {
          value: settings.short_address?.toString() || "",
          isValid: true
        },
        weighbridgecap: {
          value: settings.weighbridgecap?.toString() || "",
          isValid: true
        }
      });
    }
  }, [settings]);

  const handleInputChange = (
    field: keyof typeof printerMeta,
    val: string,
    isValid: boolean
  ) => {
    setPrinterMeta((prev) => ({
      ...prev,
      [field]: { value: val, isValid }
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!printerMeta.short_address.isValid || !printerMeta.weighbridgecap.isValid) {
      showToast.error("Please fix validation errors before submitting.");
      return;
    }

    setIsLoading(true);
    const payload = {
      short_address: printerMeta.short_address.value,
      weighbridgecap: printerMeta.weighbridgecap.value
    };

    try {
      const res = await savePrinterMeta(userID, payload);
      if (res?.data?.success) {
        showToast.success("Printer Meta updated");
      }
    } catch (err) {
      console.error("❌ Error updating Printer Meta:", err);
      showToast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-full h-full flex flex-col" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-2 gap-2 mt-3">
        <InputTag
          id="short_address"
          type="text"
          label="Short Address (max 35)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(35)]}
          value={printerMeta.short_address.value}
          max={35}
          onChangeVal={(val, isValid) => handleInputChange("short_address", val, isValid)}
        />
        <InputTag
          id="weighbridgecap"
          type="text"
          label="Bridge Capacity (50 chars)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(50)]}
          max={50}
          value={printerMeta.weighbridgecap.value}
          onChangeVal={(val, isValid) => handleInputChange("weighbridgecap", val, isValid)}
        />
      </div>

      <div className="mt-auto w-full flex justify-end">
        <BtnTag
          BtnText="Save"
          type="submit"
          loading={isLoading}
          styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)] w-full"
          onClick={onSubmitHandler}
        />
      </div>
    </form>
  );
};

export default PrinterForm;