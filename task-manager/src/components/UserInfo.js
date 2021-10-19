import React from "react";
import { Link } from "react-router-dom";

import "../styles/UserInfo.css";
import firebase from "../firebase";

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
        window.location.pathname = "/login";
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
          <h3>{this.state.user?.name}</h3>
          <h4>{this.state.user?.email}</h4>
        </div>
        <Link className="link" to="/login">
          <button
            className="button is-uppercase logoutBtn"
            onClick={this.onLogout}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  }
}

export default UserInfo;
