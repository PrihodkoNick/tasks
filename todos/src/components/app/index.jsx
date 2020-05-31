import React, { Component } from "react";

import { FILTER_TYPES } from "../../constants";
import "./app.css";

import memoizeOne from "memoize-one";

import Header from "../Header";
import Toggle from "../Toggle";
import Add from "../Add";
import List from "../List";
import Footer from "../Footer";

export default class App extends Component {
  todoId = 0;

  checkAll = (e) => {
    const checked = e.target.checked;

    this.props.store.dispatch({
      type: "CHECK_ALL",
      checked,
    });
  };

  addTodo = (label) => {
    this.props.store.dispatch({
      type: "ADD_TODO",
      label,
      done: false,
      id: (this.todoId += 1),
    });
  };

  filterTodos = memoizeOne((todos, filter) => {
    let newArray = [...todos];

    if (filter !== FILTER_TYPES.all) {
      const term = !(filter === FILTER_TYPES.active);

      newArray = newArray.filter((item) => item.done === term);

      return newArray;
    }

    return newArray;
  });

  deleteTodo = (id) => {
    this.props.store.dispatch({
      type: "DELETE_TODO",
      id,
    });
  };

  checkTodo = (id, checked) => {
    this.props.store.dispatch({
      type: "CHECK_TODO",
      id,
      checked,
    });
  };

  editTodo = (id, text) => {
    this.props.store.dispatch({
      type: "EDIT_TODO",
      id,
      text,
    });
  };

  filterChange = (filter) => {
    this.props.store.dispatch({ type: "CHANGE_FILTER", filter });
  };

  clearCompleted = () => {
    this.props.store.dispatch({
      type: "CLEAR_COMPLETED",
    });
  };

  filterDone = memoizeOne((todos) => {
    return todos.filter((item) => item.done === true);
  });

  render() {
    const { todos, filter } = this.props.store.getState();

    const hasData = todos.length || false;

    const countDone = this.filterDone(todos).length;
    const countLeft = todos.length - countDone;

    const filteredTodos = this.filterTodos(todos, filter);

    return (
      <section className="app">
        <Header />
        {hasData && <Toggle checkAll={this.checkAll} isAllDone={!countLeft} />}

        <Add addTodo={this.addTodo} />

        <List
          todos={filteredTodos}
          deleteTodo={this.deleteTodo}
          onChange={this.checkTodo}
          onEditTodo={this.editTodo}
        />
        {hasData && (
          <Footer
            left={countLeft}
            done={countDone}
            onFilterChange={this.filterChange}
            activeFilter={filter}
            clearCompleted={this.clearCompleted}
          />
        )}
      </section>
    );
  }
}
