import React from "react";

import "../styles/Content.css";
import Header from "./Header";
import ListsList from "./ListsList";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user, lists: [] };
  }

  render() {
    return (
      <div className="content">
        <Header user={this.state.user} />
        <ListsList uid={this.state.user.uid} />
      </div>
    );
  }
}

export default Content;
