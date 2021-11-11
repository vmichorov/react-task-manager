import React from "react";
import { Link } from "react-router-dom";

import "../../styles/EditList.css";
import firebase from "../../firebase";

class EditList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { listName: "", id: "" };
  }

  async componentDidMount() {
    let listsRef = firebase.firestore().collection("Lists");
    const id = window.location.pathname.substr(
      window.location.pathname.lastIndexOf("/") + 1
    );
    await listsRef
      .doc(`${id}`)
      .get()
      .then((list) => {
        this.setState({ listName: list.data().name, id: id });
      });
  }

  onListEdit = async (event) => {
    event.preventDefault();
    let listsRef = firebase.firestore().collection("Lists");
    try {
      if (this.state.listName.length === 0) {
        throw new Error("List name can't be empty");
      }
      return await listsRef
        .doc(`${this.state.id}`)
        .update({
          name: this.state.listName,
        })
        .then(() => {
          window.location.pathname = "/task-manager/";
        });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="editList">
        <h2 className="edit-title">Edit List</h2>
        <form className="editForm" onSubmit={this.onListEdit}>
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
            <input type="submit" className="button is-success" value="Edit" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditList;
