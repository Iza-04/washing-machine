import React from "react";

function ControlBlock({
  power,
  setPower,
  temperature,
  setTemperature,
  startMachine,
  isRunning,
}) {
  return (
    <div className="block">
      <h2>Control block</h2>

      <button onClick={() => setPower(true)}>Power ON</button>
      <button onClick={() => setPower(false)}>Power OFF</button>

      {/* <button disabled={!power || isRunning} onClick={startMachine}>
        Start
      </button> */}

      <div className="temp">
        <p>Temperature</p>
        <button disabled={!power} onClick={() => setTemperature(30)}>
          30°C
        </button>
        <button disabled={!power} onClick={() => setTemperature(60)}>
          60°C
        </button>
        <button disabled={!power} onClick={() => setTemperature(90)}>
          90°C
        </button>
      </div>
    </div>
  );
}

export default ControlBlock;
