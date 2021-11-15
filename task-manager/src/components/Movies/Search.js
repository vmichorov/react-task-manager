import React from "react";

import "../../styles/Search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movieName: "" };
  }

  onFormSubmit = (ev) => {
    ev.preventDefault();
  };

  render() {
    return (
      <div className="search">
        <h2>Search</h2>
        <form className="searchForm" onSubmit={this.onFormSubmit}>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input
                className="input searchField"
                placeholder="Movie Name"
                value={this.state.movieName}
                onChange={(ev) => {
                  this.setState({ movieName: ev.target.value });
                }}
              />
              <span className="icon is-left">
                <i className="bi bi-film"></i>
              </span>
            </p>
          </div>
          <input type="submit" value="Search" className="button searchBtn" />
        </form>
      </div>
    );
  }
}

export default Search;
