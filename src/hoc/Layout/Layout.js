import React, { Component } from "react";
import { connect } from "react-redux";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";

import classes from "./Layout.module.scss";

class Layout extends Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar isAuth={this.props.isAuthenticated} />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
