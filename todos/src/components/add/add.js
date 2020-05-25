import React, { Component } from "react";
import "./add.css";

export default class Add extends Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { addTodo } = this.props;

    return (
      <input
        value={this.state.value}
        type="text"
        className="new-todo"
        placeholder={"What needs to be done?"}
        onKeyUp={(e) => addTodo(e)}
        onChange={this.handleChange}
      />
    );
  }
}
