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

  return (
    <div className="machine">
      <div className="display">
        <h2>{washingPrograms[programIndex].name}</h2>
        <div className="time">{formatTime(timeLeft)}</div>
      </div>

      <div
        className={`knob ${isRunning ? "disabled" : ""}`}
        onClick={nextProgram}
        style={{ transform: `rotate(${programIndex * 60}deg)` }}
      >
        ⭕
      </div>

      <button onClick={toggleStart}>{isRunning ? "Пауза" : "Старт"}</button>

      {timeLeft === 0 && <p>Wash isdone ✅</p>}
    </div>
  );
}
