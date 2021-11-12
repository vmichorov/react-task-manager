import React from "react";
import { Link } from "react-router-dom";

import "../../styles/UserInfo.css";
import firebase from "../../firebase";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user };

    this.getUser();
  }

  onLogout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.pathname = "/auth/login";
      });
  };

  getUser = async () => {
    const usersRef = firebase.firestore().collection("Users");
    await usersRef
      .doc(`${this.state.user.uid}`)
      .get()
      .then((user) => {
        this.setState({ user: user.data() });
      });
  };

  render() {
    return (
      <div className="userContainer">
        <div className="userInfo">
          <h3>Welcome, {this.state.user?.name}</h3>
          <h4>{this.state.user?.email}</h4>
        </div>
        <div className="links">
          <Link className="link" to="/">
            <button
              className="button is-uppercase logoutBtn"
              onClick={this.onLogout}
            >
              Sign Out
            </button>
          </Link>
          <Link className="link" to="/task-manager">
            <button className="button is-uppercase linkBtn">
              Task Manager
            </button>
          </Link>
          <Link className="link" to="/movies">
            <button className="button is-uppercase linkBtn">Movies</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default UserInfo;
