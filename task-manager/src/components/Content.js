import React from "react";

import "../styles/Content.css";
import Header from "./Header";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    return (
      <div className="content">
        <Header user={this.state.user} />
      </div>
    );
  }
}

export default Content;
