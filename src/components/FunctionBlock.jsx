import React from "react";

function WashFunctionsBlock({ power, mode, setMode }) {
  return (
    <div className="block">
      <h2>Wash Functions</h2>

      <button disabled={!power} onClick={() => setMode("Washing")}>
        Washing
      </button>

      <button disabled={!power} onClick={() => setMode("Rinsing")}>
        Rinsing
      </button>

      <button disabled={!power} onClick={() => setMode("Spinning")}>
        Spinning
      </button>

      <p>Current mode: {mode}</p>
    </div>
  );
}

export default WashFunctionsBlock;
