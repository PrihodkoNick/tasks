import React, { Component } from "react";
import "./app.css";

import Header from "../header";
import Toggle from "../toggle";
import Add from "../add";
import List from "../list";
import Footer from "../footer";

export default class App extends Component {
  todoId = 0;

  state = {
    todos: [],
    filter: "All",
  };

  // check/uncheck all todos
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

  // add new todo
  addTodo = (label) => {
    const newTodo = { label, done: false, id: (this.todoId += 1) };

    this.setState(({ todos }) => {
      const newArray = [...todos, newTodo];

      return { todos: newArray };
    });
  };

  // filter all todos : all-active-completed
  filterTodos = (todos) => {
    let newArray = [...todos];

    const { filter } = this.state;

    if (filter !== "All") {
      const term = filter === "Active" ? false : true;

      newArray = newArray.filter((item) => item.done === term);
      return newArray;
    }

    return newArray;
  };

  // delete current todo
  deleteTodo = (e) => {
    e.preventDefault();

    const todoId = +e.target.closest("li").dataset.id;

    this.setState(({ todos }) => {
      const newArray = [...todos];
      const idx = newArray.findIndex((item) => item.id === todoId);

      newArray.splice(idx, 1);

      return { todos: newArray };
    });
  };

  // check/uncheck current todo
  checkTodo = (todoId, checked) => {
    this.setState(({ todos }) => {
      const newArray = [...todos];

      const idx = newArray.findIndex((item) => item.id === todoId);

      newArray[idx].done = checked;

      return { todos: newArray };
    });
  };

  // edit current todo
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

  filterChange = (e) => {
    const filter = e.target.innerText;

    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => {
      let newTodos = [...todos];
      newTodos = newTodos.filter((item) => item.done === false);

      return { todos: newTodos };
    });
  };

  render() {
    const { todos, filter } = this.state;
    const hasData = todos.length || false;

    const countDone = todos.filter((item) => item.done === true).length;
    const countLeft = todos.length - countDone;

    const filteredTodos = this.filterTodos(todos);

    return (
      <section className="todoapp">
        <Header />
        {hasData && <Toggle checkAll={this.checkAll} isAllDone={!countLeft} />}
        <Add addTodo={this.addTodo} />
        <List
          todos={filteredTodos}
          onDelete={this.deleteTodo}
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
