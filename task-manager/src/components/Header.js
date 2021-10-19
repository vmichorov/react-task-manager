import React from "react";

import "../styles/Header.css";
import UserInfo from "./UserInfo";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <UserInfo user={this.props.user} />
      </div>
    );
  }
}

export default Header;
