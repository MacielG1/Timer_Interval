import { useCallback } from "react";
import useStore from "../store/useStore";

export default function useScreenWake() {
  const [wakeLock, setWakeLock] = useStore((state) => [state.wakeLock, state.setWakeLock]);

  const enableScreenWake = useCallback(async () => {
    if (!wakeLock) {
      try {
        const newWakeLock = await navigator.wakeLock.request("screen");
        setWakeLock(newWakeLock);
      } catch (error) {
        console.error("Error requesting screen wake lock:", error);
      }
    }
  }, [wakeLock, setWakeLock]);

  const releaseScreenWake = useCallback(() => {
    if (wakeLock) {
      wakeLock
        .release()
        .then(() => {
          setWakeLock(null);
        })
        .catch((error) => {
          console.error("Error releasing screen wake lock:", error);
        });
    }
  }, [wakeLock, setWakeLock]);

  return { enableScreenWake, releaseScreenWake };
}
