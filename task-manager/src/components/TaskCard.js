import React from "react";
import { Link } from "react-router-dom";

import "../styles/TaskCard.css";
import firebase from "../firebase";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: this.props.task };
  }

  onTaskDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      let tasksRef = firebase.firestore().collection("Tasks");
      await tasksRef.doc(`${this.state.task.id}`).delete();

      window.history.pushState(
        { id: this.props.listId },
        "",
        `/list/${this.props.listId}`
      );
      window.location.reload();
    }
  };

  onTaskComplete = async () => {
    let tasksRef = firebase.firestore().collection("Tasks");

    return await tasksRef
      .doc(`${this.state.task.id}`)
      .update({
        isCompleted: !this.state.task.isCompleted,
      })
      .then(() => {
        window.history.pushState(
          { id: this.props.listId },
          "",
          `/list/${this.props.listId}`
        );
        window.location.reload();
      });
  };

  render() {
    return (
      <div
        className={`taskCard ${this.state.task.isCompleted ? "completed" : ""}`}
      >
        <div className="control nameContainer" onClick={this.onTaskComplete}>
          <p className="taskName">{this.state.task.name}</p>
        </div>
        <div className="control buttons">
          <Link to={`/tasks/update/${this.state.task.id}`}>
            <button className="button editBtn">
              <i className="far fa-edit"></i>
            </button>
          </Link>
          <button className="button deleteBtn" onClick={this.onTaskDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskCard;
