import React from "react";

import "../styles/Container.css";
import Login from "./Login";
import Register from "./Register";
import Content from "./Content";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import CreateList from "./CreateList";
import EditList from "./EditList";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";

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
          <Route path="/login" exact>
            {this.state.user === null ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route path="/register" exact>
            {this.state.user === null ? <Register /> : <Redirect to="/" />}
          </Route>
          <Route path="/lists/create" exact>
            {this.state.user !== null ? (
              <CreateList user={this.state.user} />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/lists/edit/:id" exact>
            {this.state.user !== null ? <EditList /> : <Login />}
          </Route>
          <Route path="/list/:listId" exact>
            {this.state.user !== null ? (
              <Content user={this.state.user} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/tasks/add" exact>
            {this.state.user !== null ? (
              <CreateTask
                user={this.state.user}
                listId={window.history.state?.id}
              />
            ) : (
              <Login />
            )}
          </Route>
          <Route path="/tasks/update/:id" exact>
            {this.state.user !== null ? <EditTask /> : <Login />}
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default Container;
