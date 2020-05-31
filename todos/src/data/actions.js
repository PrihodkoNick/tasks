import { ACTION_TYPES } from "./types";

export const checkAll = (payload) => ({
  type: ACTION_TYPES.checkAll,
  payload,
});

export const addTodo = (payload) => ({
  type: ACTION_TYPES.addTodo,
  payload,
});

export const deleteTodo = (payload) => ({
  type: ACTION_TYPES.deleteTodo,
  payload,
});

export const checkTodo = (payload) => ({
  type: ACTION_TYPES.checkTodo,
  payload,
});

export const editTodo = (payload) => ({
  type: ACTION_TYPES.editTodo,
  payload,
});

export const changeFilter = (payload) => ({
  type: ACTION_TYPES.changeFilter,
  payload,
});

export const clearCompleted = () => ({
  type: ACTION_TYPES.clearCompleted,
});
