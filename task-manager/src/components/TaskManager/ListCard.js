import React from "react";

import "../../styles/ListCard.css";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

class ListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: this.props.list };
  }

  onListDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      let listsRef = firebase.firestore().collection("Lists");
      await listsRef.doc(`${this.state.list.id}`).delete();
      window.location.pathname = "/task-manager/";
    }
  };

  render() {
    return (
      <div
        className={`listCard ${
          window.history.state?.listId === this.state.list.id ? "selected" : ""
        }`}
      >
        <div
          className="control nameContainer"
          onClick={() => {
            window.history.pushState(
              { listId: this.state.list.id },
              "",
              `/task-manager/list/${this.state.list.id}`
            );
            window.location.reload();
          }}
        >
          <p className="listName">{this.state.list?.name}</p>
        </div>
        <div className="control icons">
          <Link to={`/task-manager/lists/edit/${this.state.list.id}`}>
            <button className="button editBtn">
              <i className="bi bi-pencil-square"></i>
            </button>
          </Link>
          <button className="button deleteBtn" onClick={this.onListDelete}>
            <i className="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ListCard;
