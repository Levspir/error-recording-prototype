import React, { Component } from "react";
import { connect } from "react-redux";
import { Typography, CssBaseline } from "@material-ui/core";

import { ERROR_STATUSES, ERROR_ACTIONS } from "../../constants/errorConstants";
import * as actions from "../../store/actions/index";
import ErrorBuilderForm from "../../components/ErrorBuilderForm/ErrorBuilderForm";

class ErrorBuilder extends Component {
  validate = values => {
    const errors = {};
    if (!values.shortDescription) {
      errors.shortDescription = "Required";
    }
    if (!values.description) {
      errors.description = "Required";
    }
    return errors;
  };
  handleSubmit = values => {
    const currentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    const startHistory = {
      date: currentDate,
      action: ERROR_ACTIONS.registered,
      comment: "",
      user: this.props.user
    };
    const errorData = {
      shortDescription: values.shortDescription,
      description: values.description,
      priority: values.priority,
      severity: values.severity,
      registryDate: currentDate,
      id: `f${(+new Date()).toString(16)}`,
      author: this.props.user,
      status: ERROR_STATUSES.new,
      history: [startHistory]
    };
    this.props.reportError(errorData);
    this.props.history.push("/errorrecords");
  };

  render() {
    return (
      <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
        <CssBaseline />
        <Typography variant="h4" align="center" component="h1" gutterBottom>
          Report Error
        </Typography>
        <ErrorBuilderForm submit={this.handleSubmit} validate={this.validate} />
      </div>
    );
  }
}

const MapStateToProps = state => {
  return {
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reportError: errorData => dispatch(actions.errorReport(errorData))
  };
};

export default connect(
  MapStateToProps,
  mapDispatchToProps
)(ErrorBuilder);
