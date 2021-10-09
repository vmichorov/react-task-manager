import React from "react";

import "../styles/UserInfo.css";
import firebase from "../firebase";

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: props.user };

    this.getUser();
  }

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
      <div className="userInfo">
        <h3>{this.state.user?.name}</h3>
        <h4>{this.state.user?.email}</h4>
      </div>
    );
  }
}

export default UserInfo;
