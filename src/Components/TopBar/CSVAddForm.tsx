import { useState } from "react";
import { usePingerStore } from "../../store";

const CSVAddForm = ({
  onError,
  onSuccess,
}: {
  onError: (msg: string) => void;
  onSuccess: () => void;
}) => {
  const [csvText, setCsvText] = useState("");
  const addNewInstance = usePingerStore.getState().addNewInstance;

  const handleCSVAdd = () => {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    let added = 0;
    for (const line of lines) {
      const [ip, ...labelParts] = line.split(",");
      const label = labelParts.join(",").trim();
      if (ip && label) {
        addNewInstance(ip.trim(), label);
        added++;
      }
    }
    if (added === 0) {
      onError("No valid line found (expected format: ip,label)");
      return;
    }
    setCsvText("");
    onError("");
    onSuccess();
  };

  return (
    <form
      className="vertical-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleCSVAdd();
      }}
    >
      <label>
        List (ip,label)
        <textarea
          className="input"
          placeholder={"Paste here several lines in the format:\nip,label"}
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          rows={5}
        />
      </label>
      <button
        type="submit"
        className="btn btn-success"
        disabled={!csvText.trim()}
      >
        Import
      </button>
    </form>
  );
};

export default CSVAddForm;
