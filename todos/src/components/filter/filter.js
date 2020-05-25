import React from "react";
import "./filter.css";

function Filter({ onFilterChange, activeFilter }) {
  return (
    <ul className="filters">
      <li>
        <button
          className={`filters-btn ${activeFilter === "All" ? "selected" : ""}`}
          onClick={onFilterChange}
        >
          All
        </button>
      </li>
      <li>
        <button
          className={`filters-btn ${
            activeFilter === "Active" ? "selected" : ""
          }`}
          onClick={onFilterChange}
        >
          Active
        </button>
      </li>
      <li>
        <button
          className={`filters-btn ${
            activeFilter === "Completed" ? "selected" : ""
          }`}
          onClick={onFilterChange}
        >
          Completed
        </button>
      </li>
    </ul>
  );
}

export default Filter;
