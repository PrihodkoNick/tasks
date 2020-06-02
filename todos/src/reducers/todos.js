import { ACTION_TYPES } from "../data/types";

let initialState = {
  todos: [],
};

const todos = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.addTodo: {
      console.log({ ...state });
      return { ...state, todos: [...state.todos, action.payload] };
    }

    case ACTION_TYPES.checkAll: {
      return {
        ...state,
        todos: state.todos.map((item) => {
          item.done = action.payload;
          return item;
        }),
      };
    }

    case ACTION_TYPES.deleteTodo: {
      const newTodos = [...state.todos];
      const idx = newTodos.findIndex((item) => item.id === action.payload);
      newTodos.splice(idx, 1);
      return { ...state, todos: newTodos };
    }

    case ACTION_TYPES.checkTodo: {
      const { id, checked } = action.payload;
      const newTodos = [...state.todos];
      const idx = newTodos.findIndex((item) => item.id === id);
      newTodos[idx].done = checked;
      return { ...state, todos: newTodos };
    }

    case ACTION_TYPES.editTodo: {
      const { todoId, text } = action.payload;
      const newTodos = [...state.todos];
      const idx = newTodos.findIndex((item) => item.id === todoId);
      if (text) {
        newTodos[idx].label = text;
      } else {
        newTodos.splice(idx, 1); // if text is empty then delete current todo
      }
      return { ...state, todos: newTodos };
    }

    case ACTION_TYPES.clearCompleted: {
      let newTodos = [...state.todos];
      newTodos = newTodos.filter((item) => item.done === false);
      return { ...state, todos: newTodos };
    }

    default:
      return state;
  }
};

export default todos;
