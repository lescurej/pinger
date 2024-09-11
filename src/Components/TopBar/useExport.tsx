import * as dialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";
import { usePingerStore } from "../../store";

const useExport = () => {
  const showDialog = async () => {
    const filePath = await dialog.save({
      title: "Export device list",
      filters: [{ name: "pingerFile", extensions: ["pinger"] }],
    });
    if (filePath === null) return;
    const currentState = usePingerStore.getState().export();
    const totxt = JSON.stringify(currentState, null, 2);
    await fs.writeTextFile(filePath, totxt);
  };

  return showDialog;
};

export default useExport;
