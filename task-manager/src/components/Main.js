import React from "react";

import "../styles/Main.css";
import ListsList from "./ListsList";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <ListsList uid={this.props.uid} />
      </div>
    );
  }
}

export default Main;
