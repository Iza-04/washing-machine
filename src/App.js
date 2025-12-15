import React, { useState } from "react";
import DetergentBlock from "./components/DetergentBlock";
import WashFunctionsBlock from "./components/WashFunctionsBlock";
import ControlBlock from "./components/ControlBlock";

function App() {
  const [power, setPower] = useState(false);
  const [mode, setMode] = useState("None");
  const [temperature, setTemperature] = useState(30);

  return (
    <div className="machine">
      <h1>Washing Machine</h1>

      <div className="blocks">
        <DetergentBlock power={power} />
        <WashFunctionsBlock power={power} mode={mode} setMode={setMode} />
        <ControlBlock
          power={power}
          setPower={setPower}
          temperature={temperature}
          setTemperature={setTemperature}
        />
      </div>

      <div className="status">
        <p>Power: {power ? "ON" : "OFF"}</p>
        <p>Mode: {mode}</p>
        <p>Temperature: {temperature}°C</p>
      </div>
    </div>
  );
}

export default App;
