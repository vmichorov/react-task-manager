import React from "react";

import "../../styles/Content.css";
import Main from "./Main";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
  }

  render() {
    return (
      <div className="content">
        <Main uid={this.state.user.uid} />
      </div>
    );
  }
}

export default Content;
