import React from "react";

function DetergentBlock({ power }) {
  return (
    <div className="block">
      <h2>Detergents</h2>
      <p>Powder: {power ? "Added" : "Machine OFF"}</p>
      <p>Softener: {power ? "Added" : "Machine OFF"}</p>
    </div>
  );
}

export default DetergentBlock;
