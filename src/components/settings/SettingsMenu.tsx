import { useState, useEffect } from "react";
import ModalSettings from "../ModalSettings";
import Toggle from "../ToggleInput";
import useStore from "../../store/useStore";
import LanguageSwitcher from "./LanguageSwitcher";
import { isMobileDevice } from "../../utils/Vibrate";
import ImportExportTimers from "./ImportExportTimers";
import { Icons } from "../../assets/Icons";
import EnableSounds from "./EnableSounds";
import { useShallow } from "zustand/shallow";

export default function SettingsMenu() {
  let [isOpen, setIsOpen] = useState(false);

  const [preferredLanguage, setPreferredLanguage] = useStore(useShallow((state) => [state.preferredLanguage, state.setPreferredLanguage]));
  const [skipLastRest, setSkipLastRest] = useStore(useShallow((state) => [state.skipLastRest, state.setSkipLastRest]));

  const [enableBgColors, setEnableBgColors] = useStore(useShallow((state) => [state.enableBackgroundColors, state.setEnableBackgroundColors]));
  const [autoRestartonReset, setAutoRestartonReset] = useStore(useShallow((state) => [state.autoRestartonReset, state.setAutoRestartonReset]));

  const [prepOnEveryRound, setPrepOnEveryRound] = useStore(useShallow((state) => [state.prepareonEveryRound, state.setPrepareonEveryRound]));
  const [enableVibrate, setEnableVibrate] = useStore(useShallow((state) => [state.enableVibrate, state.setEnableVibrate]));

  const [enableSounds, setEnableSounds] = useStore(useShallow((state) => [state.enableSounds, state.setEnableSounds]));

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
      setState: setEnableBgColors,
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
        pt: "Reiniciar automaticamente quando reiniciar",
        fr: "Redémarrage automatique sur réinitialisation",
      },
    },
    {
      item: "prepOnEveryRound",
      state: prepOnEveryRound,
      setState: setPrepOnEveryRound,
      text: {
        en: "Prepare on every round",
        pt: "Preparo em cada rodada",
        fr: "Préparation à chaque tour",
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
  ];

  useEffect(() => {
    settings.forEach(({ item, setState }) => {
      const setting = JSON.parse(localStorage.getItem(item) || "null");
      if (setting !== null) {
        setState(setting);
      }
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggleSetting(key: string, setState: (value: boolean) => void, state: boolean) {
    const newValue = !state; // toggle the setting
    localStorage.setItem(key, JSON.stringify(newValue));
    setState(newValue);
  }

  let supportedLanguages = ["en", "pt", "fr"];

  useEffect(() => {
    // check if user language is supported, else use "en"
    let langSupported = supportedLanguages.includes(navigator.language.slice(0, 2)) ? navigator.language.slice(0, 2) : "en";
    // if lang is already set, use it, else use langSupported
    let selectedLanguage = JSON.parse(localStorage.getItem("preferredLanguage") || JSON.stringify(langSupported));

    setPreferredLanguage(selectedLanguage);
    localStorage.setItem("preferredLanguage", JSON.stringify(selectedLanguage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let isOnMobileDevice = isMobileDevice();

  let supportText = {
    en: "Support Me",
    pt: "Me Apoie",
    fr: "Soutenez-moi",
  };

  let content = (
    <>
      {settings.map((item) => {
        if (item.item === "enableVibrate" && (!isOnMobileDevice || !navigator.vibrate)) return null;
        if (item.item !== "enableSounds")
          return (
            <Toggle
              key={item.item}
              text={item.text[preferredLanguage]}
              isActive={item.state}
              toggleActive={() => handleToggleSetting(item.item, item.setState, item.state)}
            />
          );
      })}
      <EnableSounds
        handleToggleSetting={handleToggleSetting}
        preferredLanguage={preferredLanguage}
        soundsSettings={settings.find((item) => item.item === "enableSounds")}
      />
      <ImportExportTimers />
      <LanguageSwitcher />
    </>
  );

  function savedSettingsettings() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="absolute right-0 top-0 z-30 px-4 py-5 xs:px-7">
      <div className="relative">
        <div onClick={savedSettingsettings}>
          <Icons.settingIcon className="inline-block w-8 cursor-pointer" />
        </div>

        {isOpen && <ModalSettings onClose={savedSettingsettings} content={content} />}
      </div>
    </div>
  );
}
