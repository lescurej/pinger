import { useState, useCallback } from "react";
import "./MenuIcon.css";

function MenuIcon() {
  const [hovered, setHovered] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        height: "40px",
        backgroundColor: "transparent",
      }}
    >
      <div className={`menuButton ${hovered ? "active" : ""}`}></div>
      <div className={`menuButton ${hovered ? "active" : ""}`}></div>
      <div className={`menuButton ${hovered ? "active" : ""}`}></div>
    </div>
  );
}

export default MenuIcon;
