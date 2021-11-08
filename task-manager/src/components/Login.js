import React from "react";

import "../styles/Auth.css";
import firebase from "../firebase";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  onLogin = (event) => {
    event.preventDefault();

    let usersRef = firebase.firestore().collection("Users");

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(async () => {
        try {
          if (!this.state.email || !this.state.password) {
            throw new Error("All fields are required");
          }
          return await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (result) => {
              await usersRef
                .doc(`${result.user.uid}`)
                .get()
                .then((user) => {
                  firebase.auth().updateCurrentUser(user);
                  firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                      window.location.pathname = "/";
                    }
                  });
                });
            });
        } catch (e) {
          if (
            e.code === "auth/user-not-found" ||
            e.code === "auth/wrong-password"
          ) {
            e.message = "Wrong email or password";
          }
          alert(e.message);
        }
      });
  };

  render() {
    return (
      <div className="login">
        <h2 className="title">Login</h2>
        <form className="loginForm" onSubmit={this.onLogin}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={this.state.email}
                onChange={(ev) => {
                  this.setState({ email: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(ev) => {
                  this.setState({ password: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="button is-success"
                type="submit"
                value="Login"
              />
            </p>
          </div>
        </form>
        <span className="text">
          Don't have an account?{" "}
          <Link to="/register" className="authLink">
            Sign up
          </Link>{" "}
          now!
        </span>
      </div>
    );
  }
}

export default Login;
