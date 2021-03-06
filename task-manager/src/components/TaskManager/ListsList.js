import React from "react";
import { Link } from "react-router-dom";
import ListCard from "./ListCard";

import "../../styles/ListsList.css";
import firebase from "../../firebase";

class ListsList extends React.Component {
  state = { lists: [] };

  async componentDidMount() {
    const listsRef = firebase.firestore().collection("Lists");
    let lists = [];
    await listsRef
      .where("ownerId", "==", this.props.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          lists.push(data);
        });
      });
    this.setState({ lists: lists });
  }

  renderLists = () => {
    let result = this.state.lists.map((list) => {
      return <ListCard list={list} key={list.id} />;
    });
    return result;
  };

  render() {
    return (
      <div className="listsContainer">
        <div className="lists">
          {this.state.lists.length !== 0 ? (
            this.renderLists()
          ) : (
            <h6 className="noLists">You haven't created any lists yet.</h6>
          )}
        </div>
        <Link to="/task-manager/lists/create">
          <button className="button is-uppercase createListBtn">
            Create List
          </button>
        </Link>
      </div>
    );
  }
}

export default ListsList;
