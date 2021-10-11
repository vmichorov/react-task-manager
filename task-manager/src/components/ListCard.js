import React from "react";

import "../styles/ListCard.css";
import firebase from "../firebase";
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
      window.location.pathname = "/";
    }
  };

  onListEdit = () => {};

  render() {
    return (
      <div className="listCard">
        <div className="control">
          <p className="listName">{this.state.list?.name}</p>
        </div>
        <div className="control buttons">
          <Link to={`/lists/edit/${this.state.list.id}`}>
            <button className="button editBtn" onClick={this.onListEdit}>
              <i className="far fa-edit"></i>
            </button>
          </Link>
          <button className="button deleteBtn" onClick={this.onListDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ListCard;