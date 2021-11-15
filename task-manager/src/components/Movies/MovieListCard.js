import React from "react";

import "../../styles/MovieListCard.css";

class MovieListCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movie: this.props.movie };
  }

  render() {
    return (
      <div className="movieListCard">
        <div className="imageContainer">
          <img src={`${this.state.movie.imgUrl}`} alt="Movie Cover" />
        </div>
        <div className="movieDetails">
          <h3 className="title">{this.state.movie.title}</h3>
          <h4 className="relYear">
            <span className="relText">Release Date:</span>{" "}
            {this.state.movie.releaseDate}
          </h4>
          <p className="description">{this.state.movie.description}</p>
        </div>
      </div>
    );
  }
}

export default MovieListCard;
