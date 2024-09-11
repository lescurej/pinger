import { usePingerStore } from "../../../../../store";
import useReactInput from "./useReactInput";

const { changeIP } = usePingerStore.getState();

const IpInput = ({ uuid }: { uuid: string }) => {
  const ip = usePingerStore(({ state }) => state.instances[uuid].ip);

  const { onChange, onEnterKey, onBlur, value, editing } = useReactInput(
    uuid,
    ip,
    changeIP
  );

  return (
    <input
      style={{ width: "100%" }}
      onKeyDown={onEnterKey}
      onBlur={onBlur}
      onChange={onChange}
      type="text"
      value={editing ? value : ip}
    />
  );
};

export default IpInput;
