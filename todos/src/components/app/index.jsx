import React, { Component } from "react";
import { connect } from "react-redux";

import { FILTER_TYPES } from "../../data/constants";
import * as actions from "../../data/actions";

import "./app.css";

import memoizeOne from "memoize-one";

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
    this.props.addTodo({ label, done: false, id: (this.todoId += 1) });
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
    this.props.filterChange(filter);
  };

  clearCompleted = () => {
    this.props.clearCompleted();
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

  filterDone = memoizeOne((todos) => {
    return todos.filter((item) => item.done === true);
  });

  render() {
    const { todos, filter } = this.props.state;

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

const mapStateToProps = (state) => {
  return { state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAll: (payload) => dispatch(actions.checkAll(payload)),
    addTodo: (payload) => dispatch(actions.addTodo(payload)),
    deleteTodo: (payload) => dispatch(actions.deleteTodo(payload)),
    checkTodo: (payload) => dispatch(actions.checkTodo(payload)),
    editTodo: (payload) => dispatch(actions.editTodo(payload)),
    filterChange: (payload) => dispatch(actions.changeFilter(payload)),
    clearCompleted: () => dispatch(actions.clearCompleted()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
