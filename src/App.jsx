import TimerApp from "./components/TimerApp";
import Sidebar from "./components/Sidebar";
import SettingsMenu from "./components/SettingsMenu";
import useStore from "./store/useStore";
function App() {
  const bgColor = useStore((state) => state.currentBackgroundColor);
  const enableBackgroundColors = useStore((state) => state.enableBackgroundColors);

  return (
    <main
      className="py-1 px-4 sm:px-6 lg:px-8 bg-neutral-950 min-h-screen 2xl:max-h-screen sm:flex flex-col  "
      style={{ backgroundColor: enableBackgroundColors ? bgColor : "#0a0a0a" }}
    >
      <TimerApp />
      <Sidebar />
      <SettingsMenu />
    </main>
  );
}

export default App;
