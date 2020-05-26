import React, { Component } from "react";
import "./App.css";

import Header from "./components/header";
import Toggle from "./components/toggle";
import Add from "./components/add";
import List from "./components/list";
import Footer from "./components/footer";

export default class App extends Component {
  todoId = 0;

  state = {
    todos: [
      this.createNewTodo("Drink Coffee"),
      this.createNewTodo("Make awesome App"),
      this.createNewTodo("Have a lunch"),
    ],
    filter: "All",
    isAllDone: false,
  };

  // pattern for create new todo
  createNewTodo(label) {
    return { label, done: false, id: (this.todoId += 1) };
  }

  // add new todo
  addTodo = (text) => {
    const newTodo = this.createNewTodo(text);

    this.setState(({ todos }) => {
      const newTodos = [...todos, newTodo];

      return { todos: newTodos };
    });
  };

  // delete current todo
  deleteTodo = (e) => {
    e.preventDefault();

    const todoId = +e.target.closest("li").dataset.id;

    this.setState(({ todos }) => {
      const newTodos = [...todos];

      const idx = newTodos.findIndex((item) => item.id === todoId);

      newTodos.splice(idx, 1);

      return { todos: newTodos };
    });
  };

  // check/uncheck current todo
  checkTodo = (todoId, checked) => {
    this.setState(({ todos }) => {
      const newTodos = [...todos];

      const idx = newTodos.findIndex((item) => item.id === todoId);

      newTodos[idx].done = checked;

      return { todos: newTodos };
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

  checkAll = (e) => {
    const checked = e.target.previousElementSibling.checked;

    this.setState(({ todos }) => {
      let newTodos = [...todos];

      for (let item of newTodos) {
        item.done = !checked;
      }

      return { todos: newTodos };
    });
  };

  // filter all todos : all-active-completed
  filterTodos = (todos) => {
    let newTodos = [...todos];

    if (this.state.filter === "Active") {
      newTodos = newTodos.filter((item) => item.done === false);
      return newTodos;
    }

    if (this.state.filter === "Completed") {
      newTodos = newTodos.filter((item) => item.done === true);
      return newTodos;
    }

    return newTodos;
  };

  // edit current todo
  editTodo = (todoId, text) => {
    this.setState(({ todos }) => {
      const newTodos = [...todos];

      const idx = newTodos.findIndex((item) => item.id === todoId);

      if (text) {
        newTodos[idx].label = text;
      } else {
        newTodos.splice(idx, 1);
      }

      return { todos: newTodos };
    });
  };

  render() {
    const { todos, filter } = this.state;

    const hasData = todos.length || false;

    const countDone = todos.filter((item) => item.done === true).length;
    const countLeft = todos.length - countDone;

    let newTodos = this.filterTodos(todos);

    return (
      <section className="todoapp">
        <Header />
        {hasData && (
          <Toggle
            checkAll={this.checkAll}
            isAllDone={countLeft ? false : true}
          />
        )}
        <Add addTodo={this.addTodo} />
        <List
          todos={newTodos}
          onDelete={this.deleteTodo}
          onChange={this.checkTodo}
          editTodo={this.editTodo}
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
