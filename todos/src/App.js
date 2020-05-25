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
  };

  createNewTodo(label) {
    return { label, done: false, id: (this.todoId += 1) };
  }

  addTodo = (e) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      const newTodo = this.createNewTodo(e.target.value);

      this.setState(({ todos }) => {
        const newTodos = [...todos, newTodo];

        return { todos: newTodos };
      });
    }
  };

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

  checkTodo = (e) => {
    const todoId = +e.target.closest("li").dataset.id;
    const checked = e.target.checked;

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

  render() {
    const { todos, filter } = this.state;

    const hasData = todos.length || false;

    const countDone = todos.filter((item) => item.done === true).length;
    const countLeft = todos.length - countDone;

    let newTodos = [...todos];

    if (this.state.filter === "All") {
    } else if (this.state.filter === "Active") {
      newTodos = newTodos.filter((item) => item.done === false);
    } else {
      newTodos = newTodos.filter((item) => item.done === true);
    }

    return (
      <section className="todoapp">
        <Header />
        <Toggle />
        <Add addTodo={this.addTodo} />
        <List
          todos={newTodos}
          onDelete={this.deleteTodo}
          onChange={this.checkTodo}
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
