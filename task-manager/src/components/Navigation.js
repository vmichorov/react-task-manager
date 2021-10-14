import React from "react";

import "../styles/Navigation.css";
import firebase from "../firebase";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  onLogout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        window.location = "/login";
      });
  };

  render() {
    return (
      <div className="navigation">
        {window.history.state ? (
          <Link to="/tasks/add" className="link">
            <button className="button is-uppercase linkBtn">Add Task</button>
          </Link>
        ) : null}
        <Link to="/lists/create" className="link">
          <button className="button is-uppercase linkBtn">Create List</button>
        </Link>
        <Link className="link" to="/login">
          <button
            className="button is-uppercase linkBtn"
            onClick={this.onLogout}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  }
}

export default Navigation;
