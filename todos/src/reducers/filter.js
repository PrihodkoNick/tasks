import { FILTER_TYPES } from "../constants";

const filter = (state = FILTER_TYPES.all, action) => {
  if (action.type === "CHANGE_FILTER") {
    return action.filter;
  }

  return state;
};

export default filter;
