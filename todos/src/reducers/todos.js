const todos = (state = [], action) => {
  let newArray = [];
  let idx = 0;

  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: action.id, label: action.label, done: false }];

    case "CHECK_ALL":
      newArray = [...state];
      for (let item of newArray) {
        item.done = action.checked;
      }
      return newArray;

    case "DELETE_TODO":
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === action.id);
      newArray.splice(idx, 1);
      return newArray;

    case "CHECK_TODO":
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === action.id);
      newArray[idx].done = action.checked;
      return newArray;

    case "EDIT_TODO":
      newArray = [...state];
      idx = newArray.findIndex((item) => item.id === action.id);
      if (action.text) {
        newArray[idx].label = action.text;
      } else {
        newArray.splice(idx, 1); // if text is empty then delete current todo
      }
      return newArray;

    case "CLEAR_COMPLETED":
      newArray = [...state];
      newArray = newArray.filter((item) => item.done === false);
      return newArray;

    default:
      return state;
  }
};

export default todos;
