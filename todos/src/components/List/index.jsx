import React from "react";
import Todo from "../Todo";
import PropTypes from "prop-types";

function List({ todos, deleteTodo, onChange, onEditTodo }) {
  const elements = todos.map((item) => {
    const { id, label, done } = item;

    return (
      <Todo
        key={id}
        id={id}
        label={label}
        done={done}
        deleteTodo={deleteTodo}
        onChange={onChange}
        editTodo={onEditTodo}
      />
    );
  });

  return <ul className="app__content todos">{elements}</ul>;
}

List.defaultProps = {
  todos: [],
};

List.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      done: PropTypes.bool,
      id: PropTypes.number,
    })
  ),
  deleteTodo: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onEditTodo: PropTypes.func.isRequired,
};

export default List;
