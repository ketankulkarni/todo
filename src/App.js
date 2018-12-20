import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputText: "",
      data: []
    };
  }

  handleInput = e => {
    this.setState({ inputText: e.target.value });
  };

  handleAdd = e => {
    e.preventDefault();
    const { data, inputText } = this.state;
    if (inputText.trim().length === 0) {
      return alert("enter task name");
    }
    data.push({ id: new Date(), task: inputText, isComplete: false });
    this.setState({ data, inputText: "" });
  };

  status = () => {
    const { data } = this.state;
    const totalTasks = data.length;
    const status = data.reduce(
      (acc, cur) => {
        if (cur.isComplete) {
          acc.complete++;
        } else acc.incomplete++;
        return acc;
      },
      { complete: 0, incomplete: 0 }
    );
    return totalTasks ? (
      <p>{`${status.incomplete} remains out of ${totalTasks}`}</p>
    ) : (
      "enter task"
    );
  };

  markComplete = s => {
    const { data } = this.state;
    const index = data.findIndex(item => item.id === s.id);
    data[index].isComplete = true;
    this.setState({ data });
  };

  render() {
    const { inputText, data } = this.state;
    return (
      <div>
        <form onSubmit={this.handleAdd}>
          <input onChange={this.handleInput} value={inputText} />
          <button style={{ marginLeft: "10px" }} onClick={this.handleAdd}>
            add
          </button>
        </form>
        {this.status()}
        <ul>
          {data.map(item => (
            <li
              key={item.id}
              onClick={() => this.markComplete(item)}
              style={{ textDecoration: item.isComplete ? "line-through" : "" }}
            >
              {item.task}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
