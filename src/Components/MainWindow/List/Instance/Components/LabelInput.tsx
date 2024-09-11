import { usePingerStore } from "../../../../../store";
import useReactInput from "./useReactInput";

const { changeLabel } = usePingerStore.getState();

const LabelInput = ({ uuid }: { uuid: string }) => {
  const label = usePingerStore(({ state }) => state.instances[uuid].label);

  const { onChange, onEnterKey, onBlur, value, editing } = useReactInput(
    uuid,
    label,
    changeLabel
  );

  return (
    <input
      onKeyDown={onEnterKey}
      onBlur={onBlur}
      onChange={onChange}
      type="text"
      value={editing ? value : label}
    ></input>
  );
};

export default LabelInput;
