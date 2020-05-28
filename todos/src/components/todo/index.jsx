import React, { Component } from "react";
import PropTypes from "prop-types";

import "./todo.css";

export default class Todo extends Component {
  state = {
    editing: false,
    value: "",
  };

  handleCheckTodo = (e) => {
    const todoId = this.props.id;
    const checked = e.target.checked;
    this.props.onChange(todoId, checked);
  };

  editTodo = (e) => {
    this.setState({ editing: !this.state.editing, value: this.props.label });
  };

  handleBlur = (e) => {
    this.setState({ editing: !this.state.editing });
    this.props.editTodo(this.props.id, e.target.value);
  };

  handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.setState({ editing: !this.state.editing });
      this.props.editTodo(this.props.id, e.target.value);
    }
  };

  handleDelete = () => {
    this.props.deleteTodo(this.props.id);
  };

  render() {
    const { id, label, done } = this.props;
    const { editing, value } = this.state;

    return (
      <li data-id={id} className="todo">
        <div className="todo__view">
          <input
            className="todo__toggle"
            type="checkbox"
            onChange={this.handleCheckTodo}
            checked={done}
            id={`todo-toggle${id}`}
          />
          <label htmlFor={`todo-toggle${id}`}></label>
          <label
            className={`todo__text ${done ? "todo--done" : ""}`}
            onDoubleClick={this.editTodo}
          >
            {label}
          </label>
          <button className="todo__delete" onClick={this.handleDelete}></button>

          {editing && (
            <div className="todo__edit-box">
              <input
                className="todo__edit"
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

Todo.defaultProps = {
  done: false,
};

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  deleteTodo: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
