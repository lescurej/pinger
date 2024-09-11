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
    <div className={`row${active ? "" : " inactive"}`}>
      <div style={{ width: "auto" }}>
        <LabelInput uuid={uuid} />
      </div>
      <div style={{ width: "150px" }}>
        <IpInput uuid={uuid} />
      </div>
      <div style={{ width: "20px" }}>
        <StatusDot active={active} />
      </div>
      <div style={{ width: "200px", fontSize: "small", marginTop: "2px" }}>
        <LastSeen lastseen={lastseen} />
      </div>
      <div>
        <TrashLogo uuid={uuid} />
      </div>
    </div>
  );
};

export default InstanceRow;
