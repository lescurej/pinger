import { useState, useRef, useEffect } from "react";
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
  const state = usePingerStore.getState().state;
  const ipRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ipRef.current?.focus();
  }, []);

  const handleManualAdd = () => {
    if (!manualIP.trim() || !manualLabel.trim()) {
      onError("IP and label are required");
      return;
    }
    addNewInstance();
    const uuids = Object.keys(state.instances);
    const lastUuid = uuids[uuids.length - 1];
    changeIP(lastUuid, manualIP.trim());
    changeLabel(lastUuid, manualLabel.trim());
    setManualIP("");
    setManualLabel("");
    onError("");
    onSuccess();
  };

  return (
    <form
      className="vertical-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleManualAdd();
      }}
    >
      <label>
        IP
        <input
          ref={ipRef}
          type="text"
          placeholder="Enter IP address"
          value={manualIP}
          onChange={(e) => setManualIP(e.target.value)}
        />
      </label>
      <label>
        Label
        <input
          type="text"
          placeholder="Enter label"
          value={manualLabel}
          onChange={(e) => setManualLabel(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="btn-primary"
        disabled={!manualIP.trim() || !manualLabel.trim()}
        style={{ width: "100%", marginTop: 8 }}
      >
        Add
      </button>
    </form>
  );
};

export default ManualAddForm;
