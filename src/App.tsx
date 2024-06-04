import Sidebar from "./components/Sidebar";
import SettingsMenu from "./components/SettingsMenu";
import useStore from "./store/useStore";
import TimerApp from "./components/TimerApp";

export default function App() {
  const bgColor = useStore((state) => state.currentBackgroundColor);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  return (
    <main
      className="relative min-h-screen flex-col bg-neutral-950 px-4 py-1 sm:flex sm:px-6 lg:px-8 2xl:max-h-screen"
      style={{ backgroundColor: enableBackgroundColors ? bgColor : "#0a0a0a" }}
    >
      <TimerApp />
      <Sidebar />
      <SettingsMenu />

      <a href="https://www.buymeacoffee.com/macielg1" target="_blank" className="invisible fixed bottom-5 right-4 md:visible">
        <img
          src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=macielg1&button_colour=0091ff&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00"
          alt="Buy Me A Coffee"
          className="w-52"
        />
      </a>
    </main>
  );
}
