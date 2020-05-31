import React from "react";
import Filter from "../Filter";
import PropTypes from "prop-types";

import { FILTER_TYPES } from "../../data/constants";
import "./footer.css";

function Footer({ left, done, onFilterChange, activeFilter, clearCompleted }) {
  return (
    <footer className="app__footer">
      <span>{left} items left</span>
      <Filter onFilterChange={onFilterChange} activeFilter={activeFilter} />
      {done ? (
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed [{done}]
        </button>
      ) : null}
    </footer>
  );
}

Footer.defaultProps = {
  activeFilter: FILTER_TYPES.all,
};

Footer.propTypes = {
  left: PropTypes.number.isRequired,
  done: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  activeFilter: PropTypes.oneOf([
    FILTER_TYPES.all,
    FILTER_TYPES.active,
    FILTER_TYPES.completed,
  ]),
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
