import React, { Component } from "react";
import "./add.css";

export default class Add extends Component {
  state = {
    value: "",
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleKeyUp = (e) => {
    e.preventDefault();

    if (e.keyCode === 13) {
      this.props.addTodo(this.state.value);
      this.setState({ value: "" }); // clear add field
    }
  };

  render() {
    return (
      <input
        value={this.state.value}
        type="text"
        className="new-todo"
        placeholder={"What needs to be done?"}
        onKeyUp={this.handleKeyUp}
        onChange={this.handleChange}
        maxLength="50"
      />
    );
  }
}
