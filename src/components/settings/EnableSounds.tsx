import { CirclePlay } from "lucide-react";
import useStore from "../../store/useStore";
import Toggle from "../ToggleInput";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/Select";
import { useAudio } from "../../utils/playSound";
import sound1 from "../../assets/sounds/sound1.mp3";
import sound2 from "../../assets/sounds/sound2.mp3";
import start from "../../assets/sounds/start.mp3";
import stop from "../../assets/sounds/stop.mp3";

type ToggleProps = {
  preferredLanguage: "en" | "pt" | "fr";
  handleToggleSetting: (key: string, setState: (value: boolean) => void, state: boolean) => void;
  soundsSettings: { item: string; state: boolean; setState: (value: boolean) => void; text: { en: string; pt: string; fr: string } } | undefined;
};

export default function EnableSounds({ handleToggleSetting, preferredLanguage, soundsSettings }: ToggleProps) {
  const [preferredSound, setPreferredSound] = useStore((state) => [state.preferredSound, state.setPreferredSound]);
  const playSoundsType1 = useAudio(sound1, sound2);
  const playSoundsType2 = useAudio(start, stop);

  function onValueChange(sound: "audio1" | "audio2") {
    localStorage.setItem("audioType", sound);
    setPreferredSound(sound);
  }

  if (!soundsSettings) return null;

  return (
    <div className="flex">
      <Toggle
        key="enableSounds"
        text={soundsSettings.text[preferredLanguage]}
        isActive={soundsSettings.state}
        toggleActive={() => handleToggleSetting(soundsSettings.item, soundsSettings.setState, soundsSettings.state)}
      />
      <div>
        <Select
          defaultValue={preferredSound}
          onValueChange={(value: "audio1" | "audio2") => {
            console.log(value);
            onValueChange(value);
          }}
        >
          <SelectTrigger className="w-min border-0 outline-0 ring-0 focus:border-0 focus:outline-none focus:ring-0">
            {/* <SelectValue placeholder="Theme" /> */}
          </SelectTrigger>
          <SelectContent className="bg-neutral-700">
            <div className="flex items-center">
              <SelectItem value="audio1" className="cursor-pointer">
                Audio 1
              </SelectItem>
              <CirclePlay
                onClick={() => {
                  playSoundsType1(sound1);
                  setTimeout(() => playSoundsType1(sound2), 1000);
                }}
                className="mr-1 size-4 shrink-0"
              />
            </div>

            <div className="flex items-center">
              <SelectItem value="audio2" className="cursor-pointer">
                Audio 2
              </SelectItem>
              <CirclePlay
                onClick={() => {
                  playSoundsType2(start);
                  setTimeout(() => playSoundsType2(stop), 1000);
                }}
                className="cursor- mr-1 size-4 shrink-0"
              />
            </div>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
