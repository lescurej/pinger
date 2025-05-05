import { Command } from "@tauri-apps/plugin-shell";
import { usePingerStore } from "../../../../store";
import { useEffect, useState, useCallback } from "react";

const usePing = (uuid: string) => {
  const [active, setActive] = useState(false);
  const [lastseen, setLastSeen] = useState<Date | null>(null);

  const [pingValue, setPingValue] = useState<number | null>(null);

  const rate = usePingerStore(({ state }) => state.pingRateTime);
  const ip = usePingerStore(({ state }) => state.instances[uuid].ip);

  const pingFn = useCallback(async () => {
    const result = await Command.create("exec-sh", [
      "-c",
      `ping -W ${rate} -c 1 ${ip}`,
    ]).execute();
    const { code } = result;
    if (code === 0) {
      setPingValue(parsePingMs(result.stdout));
      setActive(true);
      setLastSeen(new Date());
    } else {
      setActive(false);
    }
  }, [ip]);

  useEffect(() => {
    setActive(false);
    const handle = setInterval(async () => {
      pingFn();
    }, rate * 1000);
    return () => {
      console.log("freed", handle);
      clearInterval(handle);
    };
  }, [pingFn, rate]);

  return { active, lastseen, pingValue };
};

function parsePingMs(pingOutput: string): number | null {
  // Cherche une ligne contenant "time=xx.x ms"
  const match = pingOutput.match(/time=([0-9.]+) ms/);
  if (match) {
    return parseFloat(match[1]);
  }
  // Si pas de match, retourne null (pas de réponse)
  return null;
}

export default usePing;
