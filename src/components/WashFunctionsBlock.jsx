import { useState, useEffect } from "react";

const washingPrograms = [
  { name: "Fast", time: 30 },
  { name: "Child", time: 80 },
  { name: "Wool", time: 45 },
  { name: "Cotton", time: 60 },
];

export default function WashFunctionsBlock() {
  const [programIndex, setProgramIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(washingPrograms[0].time * 60);
  const [isRunning, setIsRunning] = useState(false);

  const nextProgram = () => {
    if (isRunning) return;

    const next =
      programIndex === washingPrograms.length - 1 ? 0 : programIndex + 1;

    setProgramIndex(next);
    setTimeLeft(washingPrograms[next].time * 60);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) {
      setIsRunning(false);
      finishSound.play();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleStart = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const finishSound = new Audio("/beep.mp3");

  const [doorOpen, setDoorOpen] = useState(false);

  const toggleDoor = () => {
    if (isRunning) return;
    setDoorOpen((prev) => !prev);
  };

  const [waterLevel, setWaterLevel] = useState(0);

  return (
    <div className="washer">
      <h1 className="title">Samsung</h1>

      <div className="panel">
        {/* ЛЮК */}
        <div
          className={`block door ${doorOpen ? "open" : ""}`}
          onClick={toggleDoor}
        >
          <div className="door-circle" />
          <span>{doorOpen ? "Люк открыт" : "Люк закрыт"}</span>
        </div>

        {/* ТАБЛО */}
        <div className="block display">
          <h3>{washingPrograms[programIndex].name}</h3>
          <div className="time">{formatTime(timeLeft)}</div>
          <div className="water">💧 {waterLevel}%</div>
        </div>

        {/* РЕЖИМ */}
        <div
          className={`block knob ${isRunning ? "disabled" : ""}`}
          onClick={nextProgram}
          style={{ transform: `rotate(${programIndex * 60}deg)` }}
        >
          <div className="knob-inner" />
          <span>Режим</span>
        </div>
      </div>

      <button className="start-btn" onClick={toggleStart}>
        {isRunning ? "Пауза" : "Старт"}
      </button>

      {timeLeft === 0 && <p className="done">Стирка завершена ✅</p>}
    </div>
  );
}
