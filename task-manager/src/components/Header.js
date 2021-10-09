import React from "react";

import "../styles/Header.css";
import UserInfo from "./UserInfo";
import Navigation from "./Navigation";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <UserInfo user={this.props.user} />
        <Navigation />
      </div>
    );
  }
}

export default Header;
