import React from "react";

import "../styles/Main.css";
import ListsList from "./ListsList";
import TasksList from "./TasksList";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listId: window.history.state?.listId };
  }

  render() {
    return (
      <div className="main">
        <ListsList uid={this.props.uid} />
        {this.state.listId ? <TasksList listId={this.state.listId} /> : null}
      </div>
    );
  }
}

export default Main;
