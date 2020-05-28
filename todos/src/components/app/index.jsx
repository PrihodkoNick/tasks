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

  state = {
    todos: [],
    filter: FILTER_TYPES.all,
  };

  checkAll = (e) => {
    const checked = e.target.checked;

    this.setState(({ todos }) => {
      let newArray = [...todos];

      for (let item of newArray) {
        item.done = checked;
      }

      return { todos: newArray };
    });
  };

  addTodo = (label) => {
    const newTodo = { label, done: false, id: (this.todoId += 1) };

    this.setState(({ todos }) => {
      const newArray = [...todos, newTodo];

      return { todos: newArray };
    });
  };

  memoizedList = memoizeOne((list, term) =>
    list.filter((item) => item.done === term)
  );

  filterTodos = (todos) => {
    let newArray = [...todos];

    const { filter } = this.state;

    if (filter !== FILTER_TYPES.all) {
      const term = filter === FILTER_TYPES.active ? false : true;

      newArray = this.memoizedList(newArray, term);

      return newArray;
    }

    return newArray;
  };

  deleteTodo = (todoId) => {
    this.setState(({ todos }) => {
      const newArray = [...todos];
      const idx = newArray.findIndex((item) => item.id === todoId);

      newArray.splice(idx, 1);

      return { todos: newArray };
    });
  };

  checkTodo = (todoId, checked) => {
    this.setState(({ todos }) => {
      const newArray = [...todos];

      const idx = newArray.findIndex((item) => item.id === todoId);

      newArray[idx].done = checked;

      return { todos: newArray };
    });
  };

  editTodo = (todoId, text) => {
    this.setState(({ todos }) => {
      const newArray = [...todos];

      const idx = newArray.findIndex((item) => item.id === todoId);

      if (text) {
        newArray[idx].label = text;
      } else {
        newArray.splice(idx, 1); // if text is empty then delete current todo
      }

      return { todos: newArray };
    });
  };

  filterChange = (type) => {
    const filter = type;

    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => {
      let newArray = [...todos];
      newArray = newArray.filter((item) => item.done === false);

      return { todos: newArray };
    });
  };

  render() {
    const { todos, filter } = this.state;
    const hasData = todos.length || false;

    const countDone = todos.filter((item) => item.done === true).length;
    const countLeft = todos.length - countDone;

    const filteredTodos = this.filterTodos(todos);

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
