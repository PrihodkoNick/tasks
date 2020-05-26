import React from "react";
import "./toggle.css";

function Toggle({ checkAll, isAllDone }) {
  return (
    <label className="toggle-all">
      <input
        type="checkbox"
        className="check-all"
        onChange={checkAll}
        checked={isAllDone}
      />
      <span></span>
    </label>
  );
}

export default Toggle;
