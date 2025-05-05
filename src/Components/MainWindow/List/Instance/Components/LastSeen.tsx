const LastSeen = ({
  lastseen,
  pingValue,
}: {
  lastseen: Date | null;
  pingValue: number | null;
}) => {
  if (lastseen === null) return <></>;
  return (
    <span>
      Last seen:{" "}
      {new Date(lastseen).toLocaleString("fr-FR", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}
      {pingValue !== null && ` (${pingValue} ms)`}
    </span>
  );
};

export default LastSeen;
