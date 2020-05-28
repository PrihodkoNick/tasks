import React from "react";
import PropTypes from "prop-types";

import "./toggle.css";

function Toggle({ checkAll, isAllDone }) {
  return (
    <label className="app__toggle-all">
      <input
        type="checkbox"
        className="app__check-all"
        onChange={checkAll}
        checked={isAllDone}
      />
      <span></span>
    </label>
  );
}

Toggle.defaultProps = {
  isAllDone: false,
};

Toggle.propTypes = {
  checkAll: PropTypes.func.isRequired,
  isAllDone: PropTypes.bool,
};

export default Toggle;
