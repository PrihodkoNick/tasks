import React, { Component } from "react";
import "./todo.css";

export default class Todo extends Component {
  state = {
    editing: false,
    value: "",
  };

  handleCheckTodo = (e) => {
    const todoId = +e.target.closest("li").dataset.id;
    const checked = e.target.checked;
    this.props.onChange(todoId, checked);
  };

  editTodo = (e) => {
    this.setState({ editing: !this.state.editing, value: e.target.innerText });
  };

  handleBlur = (e) => {
    this.setState({ editing: !this.state.editing });
    this.props.editTodo(+e.target.dataset.id, e.target.value);
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.setState({ editing: !this.state.editing });
      this.props.editTodo(+e.target.dataset.id, e.target.value);
    }
  };

  render() {
    const { id, label, done, onDelete } = this.props;
    const { editing, value } = this.state;

    return (
      <li data-id={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.handleCheckTodo}
            checked={done}
            id={`todo-toggle${id}`}
          />
          <label className="toggle-label" htmlFor={`todo-toggle${id}`}></label>
          <label className={done ? "done" : ""} onDoubleClick={this.editTodo}>
            {label}
          </label>
          <button className="delete" onClick={onDelete}></button>

          {editing && (
            <div className="edit-box">
              <input
                className="edit"
                type="text"
                data-id={id}
                autoFocus
                onBlur={this.handleBlur}
                onKeyUp={this.handleKeyUp}
                defaultValue={value}
              />
            </div>
          )}
        </div>
      </li>
    );
  }
}
