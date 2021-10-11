import React from "react";

import "../styles/ListCard.css";
import firebase from "../firebase";

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
  render() {
    return (
      <div className="listCard">
        <div className="control">
          <p className="listName">{this.state.list?.name}</p>
        </div>
        <div className="control buttons">
          <button className="button editBtn">
            <i className="far fa-edit"></i>
          </button>
          <button className="button deleteBtn" onClick={this.onListDelete}>
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default ListCard;
