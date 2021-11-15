import React from "react";
import { Link } from "react-router-dom";

import "../../styles/CreateList.css";
import firebase from "../../firebase";

class CreateList extends React.Component {
  constructor(props) {
    super(props);

    this.state = { listName: "" };
  }

  onListCreate = async (event) => {
    event.preventDefault();
    let listsRef = firebase.firestore().collection("Lists");

    try {
      if (this.state.listName.length === 0) {
        throw new Error("List name can't be empty");
      }
      const id = listsRef.doc().id;
      return await listsRef
        .doc(`${id}`)
        .set({
          id: id,
          name: this.state.listName,
          ownerId: this.props.user.uid,
        })
        .then(() => {
          window.location.pathname = "/task-manager";
        });
    } catch (e) {
      alert(e.message);
    }
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
                value={this.state.listName}
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
            <Link to="/task-manager/" className="link">
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
