import { useState, useEffect } from "react";
import WashFunctionsBlock from "./components/WashFunctionsBlock";
import "./index.css";

export default function App() {
  const [selectedMode, setSelectedMode] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startWash = () => {
    if (doorOpen) {
      alert("❌ Закройте люк!");
      return;
    }
    if (!selectedMode) {
      alert("❌ Выберите режим стирки");
      return;
    }
    setIsRunning(true);
  };

  const stopWash = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setSelectedMode(null);
  };

  return (
    <div className="app">
      <h1>Стиральная машина</h1>

      <div className="machine">
        {/* Блок 1 — режимы */}
        <div className="panel">
          <WashFunctionsBlock
            setSelectedMode={setSelectedMode}
            setTimeLeft={setTimeLeft}
            isRunning={isRunning}
          />
        </div>

        {/* люк */}
        <div className="panel">
          <div className="drum">
            <div className={`water ${isRunning ? "fill" : ""}`} />
          </div>

          <button
            className={`door-btn ${doorOpen ? "open" : "closed"}`}
            onClick={() => setDoorOpen(!doorOpen)}
          >
            {doorOpen ? "Люк открыт 🚪" : "Люк закрыт 🔒"}
          </button>
        </div>

        {/* управление */}
        <div className="panel">
          <div className={`display ${isRunning ? "blink" : ""}`}>
            {timeLeft > 0 ? `${timeLeft} сек` : "READY"}
          </div>

          <button onClick={startWash}>START</button>
          <button onClick={stopWash}>STOP</button>
        </div>
      </div>
    </div>
  );
}
