import React from "react";

import "../styles/Container.css";
import Login from "./Login";
import Register from "./Register";
import Content from "./Content";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(
        sessionStorage.getItem(
          Object.keys(window.sessionStorage).filter((item) =>
            item.startsWith("firebase:authUser")
          )[0]
        )
      ),
    };
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Route path="/" exact>
            {this.state.user !== null ? (
              <Content user={this.state.user} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/login">
            {this.state.user === null ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/register">
            {this.state.user === null ? <Register /> : <Redirect to="/" />}
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default Container;
