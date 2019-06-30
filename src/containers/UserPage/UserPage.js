import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import UsersTable from "../../components/UsersTable/UsersTable";
import UpdateUserForm from "../../components/updateUserForm/updateUserForm";
import * as actions from "../../store/actions/index";

const styles = {
  root: {
    flexGrow: 1
  }
};
class UserPage extends Component {
  state = {
    showUpdateForm: false
  };
  componentDidMount() {
    this.props.requestUsers();
  }
  handleUpdateToggle = () => {
    this.setState(prevState => {
      return { showUpdateForm: !prevState.showUpdateForm };
    });
  };
  validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.surName) {
      errors.surName = "Required";
    }
    return errors;
  };
  handleSubmit = values => {
    const userData = {
      ...this.props.user,
      name: values.name,
      surName: values.surName
    };
    const { id } = this.props.user;
    this.props.updateUser(userData, id);
  };
  render() {
    const { users, user } = this.props;
    const form = this.state.showUpdateForm ? (
      <UpdateUserForm
        submit={this.handleSubmit}
        validate={this.validate}
        data={user}
      />
    ) : null;

    const table = users ? <UsersTable users={users} /> : null;
    let userInfo = null;
    if (user) {
      userInfo = (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Name : {user.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Surname : {user.surName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Email : {user.email}
            </Typography>
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Container>
        {userInfo}
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleUpdateToggle}
        >
          Update
        </Button>
        {form}
        {table}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestUsers: () => dispatch(actions.requestUsers()),
    updateUser: (userData, id) => dispatch(actions.updateUser(userData, id)),
    updateError: (errorData, id) =>
      dispatch(actions.updateErrorReport(errorData, id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserPage));
