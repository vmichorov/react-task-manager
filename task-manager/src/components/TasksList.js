import React from "react";
import TaskCard from "./TaskCard";

import "../styles/TasksList.css";
import firebase from "../firebase";

class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], listId: this.props.lid.id };
  }

  async componentDidMount() {
    const tasksRef = firebase.firestore().collection("Tasks");
    let tasks = [];
    await tasksRef
      .where("listId", "==", this.state.listId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          tasks.push(data);
        });
      });
    this.setState({ tasks: tasks });
  }

  renderTasks = () => {
    let result = this.state.tasks.map((task) => {
      return <TaskCard task={task} key={task.id} lid={this.state.listId} />;
    });
    return result;
  };

  render() {
    return (
      <div className="tasks">
        {this.state.tasks.length !== 0 ? (
          this.renderTasks()
        ) : (
          <h6 className="noTasks">You haven't added any tasks yet.</h6>
        )}
      </div>
    );
  }
}

export default TasksList;
