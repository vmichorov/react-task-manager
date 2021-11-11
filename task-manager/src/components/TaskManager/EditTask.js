import React from "react";
import { Link } from "react-router-dom";

import "../../styles/EditTask.css";
import firebase from "../../firebase";

class EditTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = { taskName: "", id: "" };
  }

  async componentDidMount() {
    let tasksRef = firebase.firestore().collection("Tasks");
    const id = window.location.pathname.substr(
      window.location.pathname.lastIndexOf("/") + 1
    );
    await tasksRef
      .doc(`${id}`)
      .get()
      .then((task) => {
        this.setState({ taskName: task.data().name, id: id });
      });
  }

  onTaskEdit = async (event) => {
    event.preventDefault();
    let tasksRef = firebase.firestore().collection("Tasks");
    try {
      if (this.state.taskName.length === 0) {
        throw new Error("List name can't be empty");
      }
      return await tasksRef
        .doc(`${this.state.id}`)
        .update({
          name: this.state.taskName,
        })
        .then(() => {
          window.location.pathname = "/task-manager/";
        });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="editTask">
        <h2 className="edit-title">Edit Task</h2>
        <form className="editForm" onSubmit={this.onTaskEdit}>
          <div className="field is-grouped">
            <p className="control has-icons-left has-icons-right is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Task Name"
                value={this.state.taskName}
                onChange={(event) => {
                  this.setState({ taskName: event.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="far fa-clipboard"></i>
              </span>
            </p>
          </div>
          <div className="buttons">
            <Link to="/task-manager/" className="link">
              <button className="button is-info gobackBtn">Go Back</button>
            </Link>
            <input type="submit" className="button is-success" value="Edit" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditTask;
