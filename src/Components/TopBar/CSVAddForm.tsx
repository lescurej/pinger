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
  const changeIP = usePingerStore.getState().changeIP;
  const changeLabel = usePingerStore.getState().changeLabel;

  const handleCSVAdd = () => {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    let added = 0;
    for (const line of lines) {
      const [ip, ...labelParts] = line.split(",");
      const label = labelParts.join(",").trim();
      if (ip && label) {
        const uuid = addNewInstance();
        changeIP(uuid, ip.trim());
        changeLabel(uuid, label);
        added++;
      }
    }
    if (added === 0) {
      onError("Aucune ligne valide trouvée (format attendu : ip,label)");
      return;
    }
    setCsvText("");
    onError("");
    onSuccess();
  };

  return (
    <>
      <textarea
        placeholder="Collez ici plusieurs lignes au format :\nip,label"
        value={csvText}
        onChange={(e) => setCsvText(e.target.value)}
        rows={5}
        style={{ width: "100%", marginTop: 8 }}
      />
      <button style={{ marginTop: 8 }} onClick={handleCSVAdd}>
        Importer
      </button>
    </>
  );
};

export default CSVAddForm;
