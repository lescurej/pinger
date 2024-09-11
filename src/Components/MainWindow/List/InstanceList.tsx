import InstanceRow from "./Instance/InstanceRow";
import { usePingerStore } from "../../../store";

const InstanceList = () => {
  const uuids = usePingerStore(({ state }) => Object.keys(state.instances));
  return (
    <>
      {uuids.map((uuid) => (
        <InstanceRow key={uuid} uuid={uuid} />
      ))}
    </>
  );
};

export default InstanceList;
