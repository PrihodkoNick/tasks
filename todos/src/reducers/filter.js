import { FILTER_TYPES } from "../data/constants";
import { ACTION_TYPES } from "../data/types";

const filter = (state = FILTER_TYPES.all, action) => {
  if (action.type === ACTION_TYPES.changeFilter) {
    return action.payload;
  }

  return state;
};

export default filter;
