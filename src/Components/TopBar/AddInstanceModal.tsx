import { useState } from "react";
import ManualAddForm from "./ManualAddForm";
import CSVAddForm from "./CSVAddForm";

const AddInstanceModal = ({ onClose }: { onClose: () => void }) => {
  const [error, setError] = useState("");

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#222",
          color: "#fff",
          padding: 24,
          borderRadius: 8,
          minWidth: 320,
          boxShadow: "0 4px 32px #0008",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Ajouter une instance</h3>
        <div style={{ marginBottom: 16 }}>
          <b>Saisie manuelle</b>
          <ManualAddForm onError={setError} onSuccess={onClose} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <b>Import CSV (ip,label)</b>
          <CSVAddForm onError={setError} onSuccess={onClose} />
        </div>
        {error && <div style={{ color: "#ff8888", marginTop: 8 }}>{error}</div>}
        <button
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AddInstanceModal;
