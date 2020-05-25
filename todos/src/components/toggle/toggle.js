import React from "react";
import "./toggle.css";

function Toggle() {
  return (
    <div className="toggle-all">
      <input type="checkbox" id="check-all" className="check-all" />
      <label for="check-all"></label>
    </div>
  );
}

export default Toggle;
