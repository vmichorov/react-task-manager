import React from "react";

import "../../styles/CreateMovie.css";
import firebase from "../../firebase";

class CreateMovie extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", releaseDate: "", description: "", imgUrl: "" };
  }

  onMovieCreate = async (event) => {
    event.preventDefault();
    let moviesRef = firebase.firestore().collection("Movies");

    try {
      if (Object.values(this.state).includes("")) {
        throw new Error("All fields are required!");
      }
      const id = moviesRef.doc().id;
      return await moviesRef
        .doc(`${id}`)
        .set({
          title: this.state.title,
          releaseDate: this.state.releaseDate,
          description: this.state.description,
          imgUrl: this.state.imgUrl,
          ownerId: this.props.user.uid,
        })
        .then(() => {
          window.location.pathname = "/movies";
        });
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div className="create">
        <h2 className="title">Create A New Movie</h2>
        <form className="createForm" onSubmit={this.onMovieCreate}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input"
                type="text"
                placeholder="Title"
                value={this.state.title}
                onChange={(ev) => {
                  this.setState({ title: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="bi bi-film"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input dateInput"
                type="date"
                placeholder="Release Date"
                value={this.state.releaseDate}
                onChange={(ev) => {
                  this.setState({ releaseDate: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="bi bi-calendar"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Description"
                value={this.state.description}
                onChange={(ev) => {
                  this.setState({ description: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="bi bi-chat-right-dots"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Image Url"
                value={this.state.imgUrl}
                onChange={(ev) => {
                  this.setState({ imgUrl: ev.target.value });
                }}
              />
              <span className="icon is-small is-left">
                <i className="bi bi-file-image"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className="button is-success createBtn"
                type="submit"
                value="Create"
              />
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateMovie;
