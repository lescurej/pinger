const LastSeen = ({ lastseen }: { lastseen: Date | null }) => {
  if (lastseen === null) return <></>;
  return <div>{`Last seen: ${lastseen.toLocaleString()}`}</div>;
};

export default LastSeen;
