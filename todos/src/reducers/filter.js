import { FILTER_TYPES } from "../data/constants";
import { ACTION_TYPES } from "../data/types";

const initialState = {
  filter: FILTER_TYPES.all,
};

const filter = (state = initialState, action) => {
  if (action.type === ACTION_TYPES.changeFilter) {
    return { ...state, filter: action.payload };
  }

  return state;
};

export default filter;
