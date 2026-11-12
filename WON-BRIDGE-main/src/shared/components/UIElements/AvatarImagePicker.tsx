import { MdOutlineEdit } from "react-icons/md";
import React, { useRef, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";

import { postImageToS3Bucket } from "@/services/shared/shared";
import { showToast } from "@/components/UI/toast";

interface propVals {
  children?: React.ReactElement;
  value: string;
  onChangeVal: (val: string, isValid: boolean) => void;
}

const AvtarImage = ({ value, onChangeVal, children }: propVals) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {};
    reader.readAsDataURL(file);

    setUploading(true); // Start showing the wave
    const startTime = Date.now();

    try {
      const response = await postImageToS3Bucket(file);
      const elapsedTime = Date.now() - startTime;
      const minDuration = 5000; // 3 seconds

      const waitRemaining = Math.max(0, minDuration - elapsedTime);

      // Wait extra time if upload was too fast
      setTimeout(() => {
        if (response.data.success) {
          const imageUrl = response.data.data;
          onChangeVal(imageUrl, true);
        } else {
          showToast.error("Upload failed");
          onChangeVal("", false);
        }
        setUploading(false);
      }, waitRemaining);
    } catch (err) {
      console.error("Upload error:", err);
      showToast.error("Upload failed");
      onChangeVal("", false);
      setUploading(false); // still wait if you want to
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      style={{
        backgroundImage: uploading ? "none" : value ? `url(${value})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
      className="flex-shrink-0 relative bg-[#ccc] h-[8rem] w-[8rem] rounded-full self-center shadow-lg flex items-center justify-center"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        id="profile"
        onChange={handleFileChange}
      />

      {/* 🧍 Icon if no image */}
      {!uploading &&
        !value &&
        (children ? (
          children
        ) : (
          <FaUserLarge className="text-white text-6xl z-0" />
        ))}

      {!uploading && (
        <label
          htmlFor="profile"
          className="absolute h-[#2rem] w-[#2rem] border border-[var(--border-secondary)] bottom-3 right-1 bg-[var(--border)] p-1 rounded-full shadow cursor-pointer"
        >
          <MdOutlineEdit />
        </label>
      )}

      {uploading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="wave-loader"></div>
        </div>
      )}
    </div>
  );
};

export default AvtarImage;
