import React from "react";

interface ConfirmModalProps {
  title?: string;
  children?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title = "Confirm",
  children,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false
}) => {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/10 flex justify-center items-center rounded-lg">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] space-y-4">
        {title && <p className="text-center text-xl font-bold">{title}</p>}
        <p className="text-center text-base text-gray-700">{children}</p>
        <div className="flex justify-between gap-2">
          <button
            onClick={onCancel}
            className="w-full py-1 rounded-xl bg-gray-200 hover:bg-gray-300 cursor-pointer"
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-full py-1 rounded-xl bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Updating..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
