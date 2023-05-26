import { useState, useEffect } from "react";
import ModalSettings from "./ModalSettings";
import Toggle from "./Toggle";
import useStore from "../store/useStore";
import SettingIcon from "../assets/SettingIcon.svg";

export default function SettingsMenu() {
  let [isOpen, setIsOpen] = useState(false);

  let skipLastRest = useStore((state) => state.skipLastRest);
  let setSkipLastRest = useStore((state) => state.setSkipLastRest);
  let enableBgColors = useStore((state) => state.enableBackgroundColors);
  let setenableBgColors = useStore((state) => state.setEnableBackgroundColors);
  let autoRestartonReset = useStore((state) => state.autoRestartonReset);
  let setAutoRestartonReset = useStore((state) => state.setAutoRestartonReset);
  let prepOnEveryRound = useStore((state) => state.prepareonEveryRound);
  let setprepOnEveryRound = useStore((state) => state.setPrepareonEveryRound);
  let enableSounds = useStore((state) => state.enableSounds);
  let setEnableSounds = useStore((state) => state.setEnableSounds);
  let enableVibrate = useStore((state) => state.enableVibrate);
  let setEnableVibrate = useStore((state) => state.setEnableVibrate);

  useEffect(() => {
    const settings = [
      { item: "skipLastRest", setState: setSkipLastRest },
      { item: "enableBgColors", setState: setenableBgColors },
      { item: "autoRestartonReset", setState: setAutoRestartonReset },
      { item: "prepOnEveryRound", setState: setprepOnEveryRound },
      { item: "enableSounds", setState: setEnableSounds },
      { item: "enableVibrate", setState: setEnableVibrate },
    ];

    settings.forEach(({ item, setState }) => {
      const setting = JSON.parse(localStorage.getItem(item));
      if (setting !== null) {
        setState(setting);
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggleSetting(key, setState, state) {
    const newValue = !state; // toggle the setting
    localStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  }

  let content = (
    <>
      <Toggle text="Skip Last Rest" isActive={skipLastRest} toggleActive={() => handleToggleSetting("skipLastRest", setSkipLastRest, skipLastRest)} />
      <Toggle
        text="Enable Background Colors"
        isActive={enableBgColors}
        toggleActive={() => handleToggleSetting("enableBgColors", setenableBgColors, enableBgColors)}
      />
      <Toggle
        text="Auto Start on Reset"
        isActive={autoRestartonReset}
        toggleActive={() => handleToggleSetting("autoRestartonReset", setAutoRestartonReset, autoRestartonReset)}
      />
      <Toggle
        text="Prepare on Every Round"
        isActive={prepOnEveryRound}
        toggleActive={() => handleToggleSetting("prepOnEveryRound", setprepOnEveryRound, prepOnEveryRound)}
      />
      <Toggle text="Enable Sounds" isActive={enableSounds} toggleActive={() => handleToggleSetting("enableSounds", setEnableSounds, enableSounds)} />
      <Toggle text="Enable Vibrate" isActive={enableVibrate} toggleActive={() => handleToggleSetting("enableVibrate", setEnableVibrate, enableVibrate)} />
    </>
  );

  function savedSettingsettings() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="p-5 px-7 absolute top-0 right-0 z-30">
      <div className="relative">
        <div onClick={savedSettingsettings}>
          <img src={SettingIcon} alt="Settings" className="inline-block cursor-pointer w-8" width="32" height="32" />
        </div>

        {isOpen && <ModalSettings onClose={savedSettingsettings} content={content} />}
      </div>
    </div>
  );
}
