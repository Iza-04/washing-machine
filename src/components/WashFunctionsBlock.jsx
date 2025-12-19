import { useState } from "react";

const modes = [
  { name: "Быстрая", time: 30 },
  { name: "Детская", time: 60 },
  { name: "Шерсть", time: 45 },
];

export default function WashFunctionsBlock({
  setSelectedMode,
  setTimeLeft,
  isRunning,
}) {
  const [active, setActive] = useState(null);

  const selectMode = (mode) => {
    if (isRunning) return;
    setActive(mode.name);
    setSelectedMode(mode.name);
    setTimeLeft(mode.time);
  };

  return (
    <div>
      <h3>Режимы стирки</h3>

      {modes.map((mode) => (
        <button
          key={mode.name}
          className={active === mode.name ? "active" : ""}
          onClick={() => selectMode(mode)}
        >
          {mode.name} ({mode.time} мин)
        </button>
      ))}
    </div>
  );
}
