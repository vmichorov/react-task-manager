import React from "react";
import { Link } from "react-router-dom";

import "../styles/TaskCard.css";

class TaskCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="taskCard">
        <div className="control">
          <p className="taskName">Task Name</p>
        </div>
        <div className="control buttons">
          <Link>
            <button className="button editBtn">
              <i className="far fa-edit"></i>
            </button>
          </Link>
          <button className="button deleteBtn">
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default TaskCard;
