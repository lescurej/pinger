const StatusDot = ({ active }: { active: boolean }) => {
  return (
    <div style={{ color: active ? "green" : "red", fontSize: "200%" }}>●</div>
  );
};

export default StatusDot;
