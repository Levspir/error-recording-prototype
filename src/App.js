import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Auth from "./containers/Auth/Auth";
import ErrorBuilder from "./containers/ErrorBuilder/ErrorBuilder";
import RecordsReult from "./containers/RecordsResult/RecordsResult";
import Layout from "./hoc/Layout/Layout";
import ErrorPage from "./containers/ErrorPage/ErrorPage";
import UserPage from "./containers/UserPage/UserPage";
import Logout from "./containers/Auth/Logout/Logout";

import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={ErrorBuilder} />
          <Route path="/errorrecords" exact component={RecordsReult} />
          <Route path="/user" exact component={UserPage} />
          <Route path="/error/:id" exact component={ErrorPage} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
