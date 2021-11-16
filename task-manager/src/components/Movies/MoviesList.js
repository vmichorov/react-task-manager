import React from "react";

import "../../styles/MoviesList.css";
import firebase from "../../firebase";

import MovieListCard from "./MovieListCard";

class MoviesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { movies: [] };
  }

  componentDidMount = async () => {
    let moviesRef = firebase.firestore().collection("Movies");
    let movies = [];

    await moviesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        movies.push(data);
      });
    });
    this.setState({ movies: movies });
  };

  renderMovies = () => {
    let result = this.state.movies
      .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
      .map((movie) => {
        return <MovieListCard movie={movie} key={movie.id} />;
      });
    return result;
  };

  render() {
    return <div className="movies">{this.renderMovies()}</div>;
  }
}

export default MoviesList;
