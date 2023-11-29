import { useEffect } from "react";

export default function useScreenWake() {
  let wakeLock: WakeLockSentinel | null = null;

  async function enableScreenWake() {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("Screen wake lock activated");
    } catch (error) {
      console.error("Error requesting screen wake lock:", error);
    }
  }

  function releaseScreenWake() {
    if (wakeLock) {
      wakeLock.release();
      console.log("Screen wake lock released");
    }
  }

  useEffect(() => {
    // Request wake lock when the component mounts
    enableScreenWake();

    // Release wake lock when the component unmounts
    return () => {
      releaseScreenWake();
    };
  }, []); // Empty dependency array ensures the effect runs only once

  // Return both functions for external use
  return { enableScreenWake, releaseScreenWake };
}
