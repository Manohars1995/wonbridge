import { useContext, useEffect, useState } from "react";
import { InputTag, BtnTag } from "@/components/UIElements/Input-Elements/Input-tags";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "@/components/UIElements/Input-Elements/input-validators";
import { saveThresholdLimit } from "@/services/admin/admin";
import { WonBridgeContext } from "@/store/WonBridge-Context";
import { showToast } from "@/components/UI/toast";

interface thresholdprops {
  threshold_limit: {
    min: number;
    max: number;
  };
}

const ThresholdForm = ({ settings }: { settings: thresholdprops }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [thresholdLimits, setThresholdLimits] = useState({
    min: { value: "0", isValid: true },
    max: { value: "10", isValid: true }
  });
  const { userID } = useContext(WonBridgeContext);

  useEffect(() => {
    if (settings?.threshold_limit) {
      setThresholdLimits({
        min: {
          value: settings.threshold_limit.min?.toString() || "0",
          isValid: true
        },
        max: {
          value: settings.threshold_limit.max?.toString() || "10",
          isValid: true
        }
      });
    }
  }, [settings]);

  const handleInputChange = (
    field: keyof typeof thresholdLimits,
    val: string,
    isValid: boolean
  ) => {
    setThresholdLimits((prev) => ({
      ...prev,
      [field]: { value: val, isValid }
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const payload = {
      min: Number(thresholdLimits.min.value),
      max: Number(thresholdLimits.max.value)
    };
    try {
      const res = await saveThresholdLimit(userID, payload);
      if (res?.data?.success) {
        showToast.success("Limit updated");
      }
    } catch (err) {
      console.error("❌ Error updating threshold limit:", err);
      showToast.error("Something went worng");
    } finally {
      setIsLoading(false);
    }

    console.log("Submitted Threshold:", payload);
  };

  return (
    <form
      className="max-w-full h-full flex flex-col"
      onSubmit={onSubmitHandler}
    >
      <div className="grid grid-cols-2 gap-2 mt-3">
        <InputTag
          id="min_threshold"
          type="number"
          label="Min Threshold (Ton)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)]}
          value={thresholdLimits.min.value}
          onChangeVal={(val, isValid) => handleInputChange("min", val, isValid)}
        />
        <InputTag
          id="max_threshold"
          type="number"
          label="Max Threshold (Ton)"
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(1)]}
          value={thresholdLimits.max.value}
          onChangeVal={(val, isValid) => handleInputChange("max", val, isValid)}
        />
      </div>

      <div className="mt-auto w-full flex justify-end">
        <BtnTag
          BtnText="Save Threshold"
          type="submit"
          loading={isLoading}
          styles="border-2 border-[var(--accent-blue)] hover:bg-[var(--accent-blue)] hover:text-[var(--primary-contrastText)] text-[var(--accent-blue)] w-full"
          onClick={onSubmitHandler}
        />
      </div>
    </form>
  );
};

export default ThresholdForm;
