import React from "react";
import { Link } from "react-router-dom";

import "../styles/CreateList.css";
import firebase from "../firebase";

class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = { taskName: "" };
    console.log(this.props);
  }

  onTaskCreate = async (event) => {
    event.preventDefault();
    let tasksRef = firebase.firestore().collection("Tasks");

    try {
      if (this.state.taskName.length === 0) {
        throw new Error("Task name can't be empty");
      }
      const id = tasksRef.doc().id;
      return await tasksRef
        .doc(`${id}`)
        .set({
          id: id,
          name: this.state.taskName,
          listId: this.props.lid,
        })
        .then(() => {
          window.location.pathname = `/list/${this.props.lid}`;
        });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="createList">
        <h2 className="create-title">Add A New Task</h2>
        <form className="createForm" onSubmit={this.onTaskCreate}>
          <div className="field is-grouped">
            <p className="control has-icons-left has-icons-right is-expanded">
              <input
                className="input"
                type="text"
                placeholder="List Name"
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
            <Link to={`/list/${this.props.lid}`} className="link">
              <button className="button is-info gobackBtn">Go Back</button>
            </Link>
            <input type="submit" className="button is-success" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateTask;
