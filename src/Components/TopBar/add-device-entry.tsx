import { createRoot } from "react-dom/client";
import AddDeviceWindow from "./AddDeviceWindow";

const root = document.getElementById("root");
if (root) {
  window.onerror = (msg, _src, _line, _col, err) => {
    root.innerHTML = `<pre style="color:red;">JS ERROR: ${msg}\n${
      err?.stack || ""
    }</pre>`;
    return false;
  };
  createRoot(root).render(<AddDeviceWindow />);
}
