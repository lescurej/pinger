import { useEffect, useState } from "react";
import AddButton from "./AddButton";
import MainMenu from "./Menu";
import { getName, getVersion } from "@tauri-apps/api/app";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function TopBar() {
  const [appName, setAppName] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    getName().then((name) => {
      setAppName(name);
    });

    getVersion().then((version) => {
      setVersion(version);
    });
  });

  return (
    <div
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1 style={{ userSelect: "none" }} className="title">
          {capitalizeFirstLetter(appName)}{" "}
          <span style={{ fontSize: "x-small" }}>{version}</span>
        </h1>
      </div>
      <AddButton />
      <MainMenu />
    </div>
  );
}

export default TopBar;
