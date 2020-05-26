import React from "react";
import "./toggle.css";

function Toggle({ checkAll, isAllDone }) {
  return (
    <div className="toggle-all">
      <input
        type="checkbox"
        id="check-all"
        className="check-all"
        checked={isAllDone ? "checked" : ""}
      />
      <label htmlFor="check-all" onClick={checkAll}></label>
    </div>
  );
}

export default Toggle;
