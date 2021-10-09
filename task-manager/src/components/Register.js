import React from "react";

import "../styles/Register.css";
import firebase from "../firebase";
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", repeat: "" };
  }

  onRegister = (event) => {
    event.preventDefault();

    let usersRef = firebase.firestore().collection("Users");

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(async () => {
        try {
          if (
            !this.state.name ||
            !this.state.email ||
            !this.state.password ||
            !this.state.repeat
          ) {
            throw new Error("All fields are required");
          } else if (this.state.password !== this.state.repeat) {
            throw new Error("Passwords don't match");
          }
          return await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
            .then(async (credential) => {
              await usersRef.doc(`${credential.user.uid}`).set({
                name: this.state.name,
                email: this.state.email,
                uid: credential.user.uid,
              });
              firebase.auth().updateCurrentUser(credential.user);
              firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  window.location.pathname = "/";
                }
              });
            });
        } catch (e) {
          if (e.code === "auth/weak-password") {
            e.message = "Password must be at least 6 characters long";
          } else if (e.code === "auth/email-already-in-use") {
            e.message = "Email already exists";
          }
          alert(e.message);
        }
      });
  };

  render() {
    return (
      <div className="register">
        <h2 className="title">Register</h2>
        <form className="registerForm" onSubmit={this.onRegister}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Name"
                value={this.state.name}
                onChange={(ev) => {
                  this.setState({ name: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user-alt"></i>
              </span>
            </p>
          </div>
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
            <p className="control has-icons-left">
              <input
                className="input"
                type="password"
                placeholder="Repeat Password"
                value={this.state.repeat}
                onChange={(ev) => {
                  this.setState({ repeat: ev.target.value });
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
                value="Register"
              />
            </p>
          </div>
        </form>
        <span className="text">
          Already have an account?{" "}
          <Link to="/login" className="authLink">
            Login
          </Link>{" "}
          now!
        </span>
      </div>
    );
  }
}

export default Register;
