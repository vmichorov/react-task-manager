import React from "react";
import { Link } from "react-router-dom";

import "../styles/CreateList.css";

class CreateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { listName: "" };
  }

  onListCreate = (event) => {
    event.preventDefault();
    console.log(this.state.listName);
  };

  render() {
    return (
      <div className="createList">
        <h2 className="create-title">Create A New List</h2>
        <form className="createForm" onSubmit={this.onListCreate}>
          <div className="field is-grouped">
            <p className="control has-icons-left has-icons-right is-expanded">
              <input
                className="input"
                type="text"
                placeholder="List Name"
                onChange={(event) => {
                  this.setState({ listName: event.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="far fa-clipboard"></i>
              </span>
            </p>
          </div>
          <div className="buttons">
            <Link to="/" className="link">
              <button className="button is-info gobackBtn">Go Back</button>
            </Link>
            <input type="submit" className="button is-success" value="Create" />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateList;
