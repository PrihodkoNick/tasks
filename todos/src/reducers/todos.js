import { ACTION_TYPES } from "../data/types";

const todos = (state = [], action) => {
  let newArray = [];
  let idx = 0;

  switch (action.type) {
    case ACTION_TYPES.addTodo:
      return [...state, action.payload];

    case ACTION_TYPES.checkAll:
      newArray = [...state];
      for (let item of newArray) {
        item.done = action.payload;
      }
      return newArray;

    case ACTION_TYPES.deleteTodo:
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === action.payload);
      newArray.splice(idx, 1);
      return newArray;

    case ACTION_TYPES.checkTodo:
      const { id, checked } = action.payload;
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === id);
      newArray[idx].done = checked;
      return newArray;

    case ACTION_TYPES.editTodo:
      const { todoId, text } = action.payload;
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === todoId);
      if (text) {
        newArray[idx].label = text;
      } else {
        newArray.splice(idx, 1); // if text is empty then delete current todo
      }
      return newArray;

    case ACTION_TYPES.clearCompleted:
      newArray = [...state];
      newArray = newArray.filter((item) => item.done === false);
      return newArray;

    default:
      return state;
  }
};

export default todos;
