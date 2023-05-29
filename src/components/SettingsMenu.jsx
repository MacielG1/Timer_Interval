import { useState, useEffect } from "react";
import ModalSettings from "./ModalSettings";
import Toggle from "./ToggleInput";
import useStore from "../store/useStore";
import SettingIcon from "../assets/SettingIcon.svg";
import LanguageSwitcher from "./LanguageSwitcher";
import { isMobileDevice } from "../utils/Vibrate";

export default function SettingsMenu() {
  let [isOpen, setIsOpen] = useState(false);

  const preferredLanguage = useStore((state) => state.preferredLanguage);
  const setPreferredLanguage = useStore((state) => state.setPreferredLanguage);

  const skipLastRest = useStore((state) => state.skipLastRest);
  const setSkipLastRest = useStore((state) => state.setSkipLastRest);
  const enableBgColors = useStore((state) => state.enableBackgroundColors);
  const setenableBgColors = useStore((state) => state.setEnableBackgroundColors);
  const autoRestartonReset = useStore((state) => state.autoRestartonReset);
  const setAutoRestartonReset = useStore((state) => state.setAutoRestartonReset);
  const prepOnEveryRound = useStore((state) => state.prepareonEveryRound);
  const setprepOnEveryRound = useStore((state) => state.setPrepareonEveryRound);
  const enableSounds = useStore((state) => state.enableSounds);
  const setEnableSounds = useStore((state) => state.setEnableSounds);
  const enableVibrate = useStore((state) => state.enableVibrate);
  const setEnableVibrate = useStore((state) => state.setEnableVibrate);

  const settings = [
    {
      item: "skipLastRest",
      state: skipLastRest,
      setState: setSkipLastRest,
      text: {
        en: "Skip last rest",
        pt: "Pular último descanso",
        fr: "Sauter le dernier repos",
      },
    },
    {
      item: "enableBgColors",
      state: enableBgColors,
      setState: setenableBgColors,
      text: {
        en: "Enable background colors",
        pt: "Ativar cores de fundo",
        fr: "Activer les couleurs de fond",
      },
    },
    {
      item: "autoRestartonReset",
      state: autoRestartonReset,
      setState: setAutoRestartonReset,
      text: {
        en: "Auto restart on reset",
        pt: "Reiniciar automaticamente quando resetar",
        fr: "Redémarrage automatique sur réinitialisation",
      },
    },
    {
      item: "prepOnEveryRound",
      state: prepOnEveryRound,
      setState: setprepOnEveryRound,
      text: {
        en: "Prepare on every round",
        pt: "Preparo em cada rodada",
        fr: "Préparation à chaque tour",
      },
    },
    {
      item: "enableSounds",
      state: enableSounds,
      setState: setEnableSounds,
      text: {
        en: "Enable sounds",
        pt: "Ativar sons",
        fr: "Activer les sons",
      },
    },
    {
      item: "enableVibrate",
      state: enableVibrate,
      setState: setEnableVibrate,
      text: {
        en: "Enable vibration",
        pt: "Ativar vibração",
        fr: "Activer la vibration",
      },
    },
  ];

  useEffect(() => {
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

  // language useEffect
  let supportedLanguages = ["en", "pt", "fr"];
  useEffect(() => {
    // check if user language is supported, else use "en"
    let langSupported = supportedLanguages.includes(navigator.language.slice(0, 2)) ? navigator.language.slice(0, 2) : "en";
    // if lang is already set, use it, else use langSupported
    let selectedLanguage = JSON.parse(localStorage.getItem("preferredLanguage")) || langSupported;

    setPreferredLanguage(selectedLanguage);
    localStorage.setItem("preferredLanguage", JSON.stringify(selectedLanguage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let isOnMobileDevice = isMobileDevice();

  let content = (
    <>
      {settings.map((item) => {
        if (item.item === "enableVibrate" && !isOnMobileDevice) return null;
        return (
          <Toggle
            key={item.item}
            text={item.text[preferredLanguage]}
            isActive={item.state}
            toggleActive={() => handleToggleSetting(item.item, item.setState, item.state)}
          />
        );
      })}

      <div>
        <LanguageSwitcher />
      </div>
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
