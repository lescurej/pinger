import { useState, useCallback, ChangeEvent } from "react";

const useReactInput = (
  uuid: string,
  defaultValue: string,
  changeValue: (uuid: string, value: string) => void
) => {
  const [editing, setEditing] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setEditing(true);
    setValue(event.target.value);
  }, []);

  const onBlur = useCallback(() => {
    changeValue(uuid, value);
    setEditing(false);
  }, [value]);

  const onEnterKey = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        changeValue(uuid, value);
        setEditing(false);
      }
    },
    [value]
  );

  return { onChange, onEnterKey, onBlur, value, editing };
};

export default useReactInput;
