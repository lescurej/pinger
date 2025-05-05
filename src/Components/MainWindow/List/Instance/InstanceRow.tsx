import "./InstanceRow.css";
import StatusDot from "./Components/StatusDot";
import TrashLogo from "./Components/TrashLogo";
import LabelInput from "./Components/LabelInput";
import IpInput from "./Components/IpInput";
import usePing from "./usePing";
import LastSeen from "./Components/LastSeen";
import { usePingerStore } from "../../../../store";

const InstanceRow = ({ uuid }: { uuid: string }) => {
  const showOnlyInactive = usePingerStore(
    ({ state }) => state.showOnlyInactive
  );

  const { active, lastseen, pingValue } = usePing(uuid);

  if (showOnlyInactive && active) return null;

  return (
    <div className={`instance-row ${active ? "active" : "inactive"}`}>
      <span className="row-input">
        <LabelInput uuid={uuid} />
      </span>
      <span className="row-input ip-input">
        <IpInput uuid={uuid} />
      </span>
      <span className="spacer" />
      <span className="last-seen">
        <LastSeen lastseen={lastseen} pingValue={pingValue} />
      </span>

      <span className="status-dot">
        <StatusDot active={active} />
      </span>
      <button className="delete-btn">
        <TrashLogo uuid={uuid} />
      </button>
    </div>
  );
};

export default InstanceRow;
