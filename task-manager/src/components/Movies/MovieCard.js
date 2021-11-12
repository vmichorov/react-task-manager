import React from "react";

import "../../styles/MovieCard.css";

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="movieCard">
        <div className="imageContainer">
          <img
            src="https://wwv.yify-magnet.com/img/default_thumbnail.svg"
            alt="Movie Cover"
          />
        </div>
        <div className="movieDetails">
          <h3 className="title">Movie Title</h3>
          <h4 className="relYear">2009</h4>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            hendrerit ligula orci, ac lobortis ante ultrices ut. Sed sodales
            congue odio quis gravida. Nulla eu tellus vitae magna suscipit
            tincidunt et quis dolor. Aliquam at bibendum justo. Donec hendrerit
            quis est sed consectetur.
          </p>
        </div>
      </div>
    );
  }
}

export default MovieCard;
