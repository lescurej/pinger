import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/theme-dark.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuRadioGroup,
  SubMenu,
} from "@szhsin/react-menu";
import MenuIcon from "./MenuIcon";
import { useCallback } from "react";
import { exit } from "@tauri-apps/plugin-process";
import {} from "@tauri-apps/api";

import { usePingerStore } from "../../store";
import useImport from "./useImport";
import useExport from "./useExport";

const changePingRate = usePingerStore.getState().changePingRate;
const removeAll = usePingerStore.getState().removeAll;

function MainMenu() {
  const onExitClick = useCallback(() => {
    exit(1).catch(console.error);
  }, []);

  const onImportClick = useImport();
  const onExportClick = useExport();

  const pingRate = usePingerStore(({ state }) => state.pingRateTime);

  return (
    <Menu
      menuStyle={{ backgroundColor: "#2f2f2f" }}
      align="end"
      theming="dark"
      menuButton={
        <MenuButton style={{ backgroundColor: "transparent", padding: "0px" }}>
          <MenuIcon />
        </MenuButton>
      }
      transition
    >
      <MenuItem onClick={onImportClick}>Import</MenuItem>
      <MenuItem onClick={onExportClick}>Export</MenuItem>
      <MenuDivider />
      <SubMenu label="Ping frequency">
        <MenuRadioGroup
          value={String(pingRate)}
          onRadioChange={(e) => changePingRate(Number(e.value))}
        >
          <MenuItem type="radio" value="0.5">
            0.5 sec
          </MenuItem>
          <MenuItem type="radio" value="1">
            1 sec
          </MenuItem>
          <MenuItem type="radio" value="5">
            5 sec
          </MenuItem>
        </MenuRadioGroup>
      </SubMenu>
      <MenuDivider />
      <MenuItem style={{ color: "red" }} onClick={removeAll}>
        Remove all
      </MenuItem>
      <MenuDivider />
      <MenuItem onClick={onExitClick}>Quit</MenuItem>
    </Menu>
  );
}

export default MainMenu;
