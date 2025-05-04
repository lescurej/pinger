import "./InstanceRow.css";
import StatusDot from "./Components/StatusDot";
import TrashLogo from "./Components/TrashLogo";
import LabelInput from "./Components/LabelInput";
import IpInput from "./Components/IpInput";
import usePing from "./usePing";
import LastSeen from "./Components/LastSeen";

const InstanceRow = ({ uuid }: { uuid: string }) => {
  const { active, lastseen } = usePing(uuid);

  return (
    <div className="row">
      <div style={{ flex: 2 }}>
        <LabelInput uuid={uuid} />
      </div>
      <div style={{ flex: 2 }}>
        <IpInput uuid={uuid} />
      </div>
      <div className="status-dot" style={{ width: 32 }}>
        <StatusDot active={active} />
      </div>
      <div style={{ flex: 3, fontSize: "small" }}>
        <LastSeen lastseen={lastseen} />
      </div>
      <div>
        <TrashLogo uuid={uuid} />
      </div>
    </div>
  );
};

export default InstanceRow;
