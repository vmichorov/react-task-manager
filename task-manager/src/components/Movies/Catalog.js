import React from "react";

import "../../styles/Catalog.css";
import Search from "./Search";
import MovieCard from "./MovieCard";

class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    return (
      <div className="catalog">
        <Search />
        <MovieCard />
        <MovieCard />
      </div>
    );
  }
}

export default Catalog;
