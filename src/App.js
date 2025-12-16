import React, { useState, useEffect } from "react";
import DetergentBlock from "./components/DetergentBlock";
import WashFunctionsBlock from "./components/WashFunctionsBlock";
import ControlBlock from "./components/ControlBlock";

function App() {
  const [power, setPower] = useState(false);
  const [mode, setMode] = useState("None");
  const [temperature, setTemperature] = useState(30);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Таймер
  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Таймер закончился
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setMode("Finished");
    }
  }, [timeLeft, isRunning]);

  const startMachine = () => {
    if (!power || mode === "None") return;
    setTimeLeft(10); // 10 секунд для примера
    setIsRunning(true);
  };

  return (
    <div className="machine">
      <h1>Washing Machine</h1>

      {/* drum */}
      <div className={`drum ${isRunning ? "spin" : ""}`}></div>

      <div className="blocks">
        <DetergentBlock power={power} />
        <WashFunctionsBlock power={power} mode={mode} setMode={setMode} />
        <ControlBlock
          power={power}
          setPower={setPower}
          temperature={temperature}
          setTemperature={setTemperature}
          startMachine={startMachine}
          isRunning={isRunning}
        />
      </div>

      <div className="status">
        <p>Power: {power ? "ON" : "OFF"}</p>
        <p>Mode: {mode}</p>
        <p>Temperature: {temperature}°C</p>
        <p>Time left: {timeLeft}s</p>
      </div>
    </div>
  );
}

export default App;
