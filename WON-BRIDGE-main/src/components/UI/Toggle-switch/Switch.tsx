import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./SwitchToggle.module.css";
import ConfirmModal from "@/components/UI/Modals/ConfirmModal";

interface props {
  checked: boolean;
  setChecked: (val: boolean) => void;
}

export default function SwitchToggle({ checked, setChecked }: props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pendingValue, setPendingValue] = useState<boolean>(checked);

  const handleToggle = () => {
    setPendingValue(!checked); // Store the new value (not yet committed)
    setShowModal(true); // Show confirmation modal
  };

  const confirmChange = () => {
    setChecked(pendingValue); // Apply the pending change
    setShowModal(false); // Close modal
  };

  const cancelChange = () => {
    setShowModal(false); // Just close modal, do nothing
  };

  return (
    <>
      <div className="flex gap-2 bg-transparent">
        <span className="font-semibold text-sm bg-transparent">
          {checked ? "Active" : "Inactive"}
        </span>

        <label
          className={`${styles.switch} relative inline-block`}
          style={{ fontSize: 0 }}
        >
          <input type="checkbox" checked={checked} onChange={handleToggle} />
          <div className={styles.slider}>
            <div className={styles.circle}>
              <FaCheck className={styles.checkmark} />
              <FaTimes className={styles.cross} />
            </div>
          </div>
        </label>
      </div>

      {showModal && (
        <ConfirmModal
          title="Are you sure?"
          confirmText="Yes"
          cancelText="No"
          onConfirm={confirmChange}
          onCancel={cancelChange}
        >
          <p>
            Do you want to mark it as
            <span className="font-bold text-sm bg-transparent"> {pendingValue ? "Active" : "Inactive"}</span> ?
          </p>
        </ConfirmModal>
      )}
    </>
  );
}
