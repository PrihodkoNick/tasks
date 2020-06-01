import React, { Component } from "react";
import { connect } from "react-redux";

import { FILTER_TYPES } from "../../data/constants";
import * as actions from "../../data/actions";

import "./app.css";

import memoizeOne from "memoize-one";
import { createSelector } from "reselect";

import Header from "../Header";
import Toggle from "../Toggle";
import Add from "../Add";
import List from "../List";
import Footer from "../Footer";

class App extends Component {
  todoId = 0;

  checkAll = (e) => {
    this.props.checkAll(e.target.checked);
  };

  addTodo = (label) => {
    const payload = { label, done: false, id: (this.todoId += 1) };
    this.props.addTodo(payload);
  };

  deleteTodo = (id) => {
    this.props.deleteTodo(id);
  };

  checkTodo = (id, checked) => {
    this.props.checkTodo({ id, checked });
  };

  editTodo = (id, text) => {
    this.props.editTodo({ todoId: id, text });
  };

  filterChange = (filter) => {
    this.props.changeFilter(filter);
  };

  clearCompleted = () => {
    this.props.clearCompleted();
  };

  filterTodos = memoizeOne((todos, filter) => {
    let newTodos = [...todos];
    if (filter !== FILTER_TYPES.all) {
      const term = !(filter === FILTER_TYPES.active);
      newTodos = newTodos.filter((item) => item.done === term);
      return newTodos;
    }

    return newTodos;
  });

  filterDone = memoizeOne((todos) => {
    return todos.filter((item) => item.done === true);
  });

  filterDoneSelector = createSelector(
    (todos) => todos,
    (todos) => {
      return todos.filter((item) => item.done === true);
    }
  );

  render() {
    const { todos, filter } = this.props;

    const hasData = todos.length || false;

    const countDone = this.filterDoneSelector(todos).length;
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

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  filter: state.filter.filter,
});

// const mapDispatchToProps = {
//   checkAll: actions.checkAll,
//   addTodo: actions.addTodo,
//   deleteTodo: actions.deleteTodo,
//   checkTodo: actions.checkTodo,
//   editTodo: actions.editTodo,
//   changeFilter: actions.changeFilter,
//   clearCompleted: actions.clearCompleted,
// };

export default connect(mapStateToProps, actions)(App);
