import React from "react";

import "../styles/Main.css";
import ListsList from "./ListsList";
import TasksList from "./TasksList";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <ListsList uid={this.props.uid} />
<<<<<<< HEAD
=======
        {window.history.state ? <TasksList lid={window.history.state} /> : null}
>>>>>>> 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
      </div>
    );
  }
}

export default Main;
