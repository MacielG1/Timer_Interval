import "./App.css";
import TimerApp from "./components/TimerApp";
import Sidebar from "./components/Sidebar";
import SettingsMenu from "./components/SettingsMenu";
function App() {
  return (
    <main className="py-1 px-4 sm:px-6 lg:px-8 bg-neutral-950 min-h-screen  sm:flex flex-col  ">
      <TimerApp />
      <Sidebar />
      <SettingsMenu />
    </main>
  );
}

export default App;
