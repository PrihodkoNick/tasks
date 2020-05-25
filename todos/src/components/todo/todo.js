import React from "react";
import "./todo.css";

function Todo({ id, label, done, onDelete, onChange }) {
  return (
    <li data-id={id}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={onChange}
          checked={done}
          id={`todo-toggle${id}`}
        />
        <label className="toggle-label" for={`todo-toggle${id}`}></label>
        <label className={done ? "done" : ""}>{label}</label>
        <button className="delete" onClick={onDelete}></button>
      </div>
    </li>
  );
}

export default Todo;
