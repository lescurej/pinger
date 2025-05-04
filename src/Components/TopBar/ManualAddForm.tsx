import { useState } from "react";
import { usePingerStore } from "../../store";

const ManualAddForm = ({
  onError,
  onSuccess,
}: {
  onError: (msg: string) => void;
  onSuccess: () => void;
}) => {
  const [manualIP, setManualIP] = useState("");
  const [manualLabel, setManualLabel] = useState("");
  const addNewInstance = usePingerStore.getState().addNewInstance;
  const changeIP = usePingerStore.getState().changeIP;
  const changeLabel = usePingerStore.getState().changeLabel;

  const handleManualAdd = () => {
    if (!manualIP.trim() || !manualLabel.trim()) {
      onError("IP et label requis");
      return;
    }
    const uuid = addNewInstance();
    changeIP(uuid, manualIP.trim());
    changeLabel(uuid, manualLabel.trim());
    setManualIP("");
    setManualLabel("");
    onError("");
    onSuccess();
  };

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      <input
        type="text"
        placeholder="IP"
        value={manualIP}
        onChange={(e) => setManualIP(e.target.value)}
        style={{ flex: 1 }}
      />
      <input
        type="text"
        placeholder="Label"
        value={manualLabel}
        onChange={(e) => setManualLabel(e.target.value)}
        style={{ flex: 1 }}
      />
      <button onClick={handleManualAdd}>Ajouter</button>
    </div>
  );
};

export default ManualAddForm;
