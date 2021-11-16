import React from "react";
import { Link } from "react-router-dom";

import "../../styles/Catalog.css";
import Search from "./Search";
import MoviesList from "./MoviesList";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    return (
      <div className="catalog">
        <Search />
        <div className="navControls">
          <div className="viewControls">
            <button className="button view listControl">
              <i className="bi bi-list"></i>
            </button>
            <button className="button view gridControl">
              <i className="bi bi-grid"></i>
            </button>
          </div>
          <div className="navigation">
            {/* <Link to="/movies/favourites">
              <button className="button navItem">Favourites</button>
            </Link> */}
            <Link to="/movies/create">
              <button className="button navItem">Create</button>
            </Link>
          </div>
        </div>
        <MoviesList />
      </div>
    );
  }
}

export default Catalog;
