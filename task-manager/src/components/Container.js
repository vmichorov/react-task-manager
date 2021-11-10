import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

import "../styles/Container.css";
// Common
import Login from "./User/Login";
import Register from "./User/Register";
import UserInfo from "./User/UserInfo";
// Task Manager
import Content from "./TaskManager/Content";
import CreateList from "./TaskManager/CreateList";
import EditList from "./TaskManager/EditList";
import CreateTask from "./TaskManager/CreateTask";
import EditTask from "./TaskManager/EditTask";

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
          {/* Authentication */}
          <Switch>
            <Route path="/auth/login" exact>
              {this.state.user === null ? <Login /> : <Redirect to="/" />}
            </Route>
            <Route path="/auth/register" exact>
              {this.state.user === null ? <Register /> : <Redirect to="/" />}
            </Route>
          </Switch>
          {/* Task Manager */}
          <Switch>
            <Route path="/" exact>
              <Redirect to="/task-manager" />
            </Route>
            <Route path="/task-manager" exact>
              {this.state.user != null ? (
                <UserInfo user={this.state.user} />
              ) : null}
              {this.state.user !== null ? (
                <Content user={this.state.user} />
              ) : (
                <Redirect to="/auth/login" />
              )}
            </Route>
            <Route path="/task-manager/lists/create" exact>
              {this.state.user !== null ? (
                <CreateList user={this.state.user} />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/task-manager/lists/edit/:id" exact>
              {this.state.user !== null ? <EditList /> : <Login />}
            </Route>
            <Route path="/task-manager/list/:listId" exact>
              {this.state.user != null ? (
                <UserInfo user={this.state.user} />
              ) : null}
              {this.state.user !== null ? (
                <Content user={this.state.user} />
              ) : (
                <Redirect to="/auth/login" />
              )}
            </Route>
            <Route path="/task-manager/tasks/add" exact>
              {this.state.user !== null ? (
                <CreateTask
                  user={this.state.user}
                  listId={window.history.state?.listId}
                />
              ) : (
                <Login />
              )}
            </Route>
            <Route path="/task-manager/tasks/update/:id" exact>
              {this.state.user !== null ? <EditTask /> : <Login />}
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Container;
