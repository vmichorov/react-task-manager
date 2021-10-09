import React from "react";

import "../styles/Navigation.css";
import firebase from "../firebase";

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
        <button className="button is-uppercase">Create List</button>
        <button className="button is-uppercase" onClick={this.onLogout}>
          Sign Out
        </button>
      </div>
    );
  }
}

export default Navigation;
