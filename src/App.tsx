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
    </main>
  );
}
