import { useState, useEffect } from "react";
import ModalSettings from "../ModalSettings";
import Toggle from "../ToggleInput";
import useStore from "../../store/useStore";
import LanguageSwitcher from "./LanguageSwitcher";
import { isMobileDevice } from "../../utils/Vibrate";
import ImportExportTimers from "./ImportExportTimers";
import { Icons } from "../../assets/Icons";
import EnableSounds from "./EnableSounds";

export default function SettingsMenu() {
  let [isOpen, setIsOpen] = useState(false);

  const [preferredLanguage, setPreferredLanguage] = useStore((state) => [state.preferredLanguage, state.setPreferredLanguage]);
  const [skipLastRest, setSkipLastRest] = useStore((state) => [state.skipLastRest, state.setSkipLastRest]);

  const [enableBgColors, setEnableBgColors] = useStore((state) => [state.enableBackgroundColors, state.setEnableBackgroundColors]);
  const [autoRestartonReset, setAutoRestartonReset] = useStore((state) => [state.autoRestartonReset, state.setAutoRestartonReset]);

  const [prepOnEveryRound, setPrepOnEveryRound] = useStore((state) => [state.prepareonEveryRound, state.setPrepareonEveryRound]);
  const [enableVibrate, setEnableVibrate] = useStore((state) => [state.enableVibrate, state.setEnableVibrate]);

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

  // language useEffect
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
      <EnableSounds handleToggleSetting={handleToggleSetting} preferredLanguage={preferredLanguage} />
      <a href="https://www.buymeacoffee.com/macielg1" target="_blank" referrerPolicy="no-referrer" className="mx-auto my-1 inline-block">
        <img
          src={`https://img.buymeacoffee.com/button-api/?text=${supportText[preferredLanguage]}&emoji=☕&slug=macielg1&button_colour=0091ff&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00`}
          alt="Buy Me A Coffee"
          className="w-48"
        />
      </a>
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
