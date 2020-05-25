import React from "react";
import Filter from "../filter";
import "./footer.css";

function Footer({ left, done, onFilterChange, activeFilter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{left} items left</span>
      <Filter onFilterChange={onFilterChange} activeFilter={activeFilter} />
      {done ? (
        <button className="clear-completed">Clear completed [{done}]</button>
      ) : (
        ""
      )}
    </footer>
  );
}

export default Footer;
