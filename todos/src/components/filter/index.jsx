import React from "react";
import PropTypes from "prop-types";

import { FILTER_TYPES } from "../../data/constants";
import "./filter.css";

let classNames = require("classnames");

function Filter({ onFilterChange, activeFilter }) {
  return (
    <ul className="filters">
      <li className="filters__item">
        <button
          className={classNames("filters__toggle", {
            selected: activeFilter === FILTER_TYPES.all,
          })}
          onClick={() => onFilterChange(FILTER_TYPES.all)}
        >
          {FILTER_TYPES.all}
        </button>
      </li>
      <li className="filters__item">
        <button
          className={classNames("filters__toggle", {
            selected: activeFilter === FILTER_TYPES.active,
          })}
          onClick={() => onFilterChange(FILTER_TYPES.active)}
        >
          {FILTER_TYPES.active}
        </button>
      </li>
      <li className="filters__item">
        <button
          className={classNames("filters__toggle", {
            selected: activeFilter === FILTER_TYPES.completed,
          })}
          onClick={() => onFilterChange(FILTER_TYPES.completed)}
        >
          {FILTER_TYPES.completed}
        </button>
      </li>
    </ul>
  );
}

Filter.defaultProps = {
  activeFilter: FILTER_TYPES.all,
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  activeFilter: PropTypes.oneOf([
    FILTER_TYPES.all,
    FILTER_TYPES.active,
    FILTER_TYPES.completed,
  ]),
};

export default Filter;
