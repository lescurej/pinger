import ManualAddForm from "./ManualAddForm";
import CSVAddForm from "./CSVAddForm";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddInstanceModal = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          minWidth: 440,
          maxWidth: 600,
          margin: "40px auto",
          background: "#232323",
          color: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 40px #000a",
          padding: 40,
          fontSize: "1.08em",
          fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif",
        }}
      >
        <button className="close-btn" aria-label="Close" onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <h2>Add a device</h2>
        <div className="section">
          <h3>Manual entry</h3>
          <ManualAddForm
            onError={setError}
            onSuccess={() => {
              setSuccess("Device added!");
              setError("");
              setTimeout(() => setSuccess(""), 1500);
              onClose();
            }}
          />
        </div>
        <hr />
        <div className="section">
          <h3>Import from CSV</h3>
          <CSVAddForm
            onError={setError}
            onSuccess={() => {
              setSuccess("Devices imported!");
              setError("");
              setTimeout(() => setSuccess(""), 1500);
              onClose();
            }}
          />
        </div>
        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="success-message" role="status">
            {success}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddInstanceModal;
