import React from "react";
import Todo from "../todo";

import "./list.css";

function List({ todos, onDelete, onChange, onEditTodo }) {
  const elements = todos.map((item) => {
    const { id, label, done } = item;

    return (
      <Todo
        key={id}
        id={id}
        label={label}
        done={done}
        onDelete={onDelete}
        onChange={onChange}
        editTodo={onEditTodo}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default List;
