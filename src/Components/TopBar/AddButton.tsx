import { useCallback, useState } from "react";
import "./MenuIcon.css";
import { usePingerStore } from "../../store";

const { addNewInstance } = usePingerStore.getState();

const AddButton = () => {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <div
      onClick={addNewInstance}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="button"
      style={{
        WebkitUserSelect: "none",
        userSelect: "none",
        cursor: "pointer",
        fontSize: "52px",
        paddingTop: "10px",
        color: `rgba(255, 255, 255, ${hovered ? 1 : 0.5})`,
      }}
    >
      +
    </div>
  );
};

export default AddButton;
