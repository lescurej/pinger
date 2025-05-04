import { useCallback, useState } from "react";
import "./MenuIcon.css";
import AddInstanceModal from "./AddInstanceModal";

const AddButton = () => {
  const [hovered, setHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <>
      <div
        onClick={() => setShowPopup(true)}
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
      {showPopup && <AddInstanceModal onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default AddButton;
