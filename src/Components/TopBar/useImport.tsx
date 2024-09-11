import * as dialog from "@tauri-apps/plugin-dialog";
import * as fs from "@tauri-apps/plugin-fs";
import { TDefaultState, usePingerStore } from "../../store";

const checkFileContent = (filecontent: string) => {
  try {
    const jsoncontent = JSON.parse(filecontent) as TDefaultState;
    if (!("pingRateTime" in jsoncontent)) {
      throw new Error("bad pingRateTime");
    }
    if (!("instances" in jsoncontent)) {
      throw new Error("bad instances values");
    }
    const { instances } = jsoncontent;
    const arrayInstances = Object.entries(instances);

    for (const [uuid, data] of arrayInstances) {
      if (typeof uuid !== "string") {
        throw new Error(`bad uuid ${uuid}`);
      }
      if (typeof data !== "object") {
        throw new Error(`bad data for ${uuid}`);
      }
      if (typeof data.ip !== "string") {
        throw new Error(`bad ip for ${uuid}`);
      }
      if (typeof data.label !== "string") {
        throw new Error(`bad label for ${uuid}`);
      }
    }
    return jsoncontent;
  } catch (e) {
    throw e;
  }
};

const useImport = () => {
  const showDialog = async () => {
    const filePath = await dialog.open({
      title: "Import device list",
      filters: [{ name: "pingerFile", extensions: ["pinger"] }],
      directory: false,
    });

    const filecontent = await fs.readTextFile(filePath as string);
    const jsoncontent = checkFileContent(filecontent);
    usePingerStore.getState().import(jsoncontent);
  };
  return showDialog;
};

export default useImport;
