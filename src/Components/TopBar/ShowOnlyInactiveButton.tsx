import { usePingerStore } from "../../store";

const showOnlyInactive = usePingerStore.getState().showOnlyInactive;

const ShowOnlyInactiveButton = () => {
  const isShowOnlyInactive = usePingerStore(
    ({ state }) => state.showOnlyInactive
  );

  const handleClick = () => {
    showOnlyInactive(!isShowOnlyInactive);
  };

  return (
    <button
      style={{ backgroundColor: isShowOnlyInactive ? "grey" : "transparent" }}
      onClick={handleClick}
    >
      Show only inactive
    </button>
  );
};

export default ShowOnlyInactiveButton;
