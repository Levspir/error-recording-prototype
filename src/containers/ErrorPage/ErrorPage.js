import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import {
  ERROR_SEVERITY,
  ERROR_PRIORITY,
  ERROR_STATUSES,
  ERROR_ACTIONS
} from "../../constants/errorConstants";
import * as actions from "../../store/actions/index";
import ChangeStatusDialog from "../../components/ChangeStatusDialog/ChangeStatusDialog";
import HistoryTable from "../../components/HistoryTable/HistoryTable";
import ErrorBuilderForm from "../../components/ErrorBuilderForm/ErrorBuilderForm";

const styles = {
  button: {
    margin: 16
  }
};

class ErrorPage extends Component {
  state = {
    showDialog: false,
    comment: "",
    actionType: "",
    showUpdateForm: false
  };

  ERROR_SEVERITY_FIELDS = [
    {
      title: "Critical",
      severity: ERROR_SEVERITY.critical
    },
    {
      title: "Significant",
      severity: ERROR_SEVERITY.significant
    },
    {
      title: "Minor",
      severity: ERROR_SEVERITY.minor
    },
    {
      title: "Request for Change",
      severity: ERROR_SEVERITY.requestForChange
    }
  ];
  ERROR_PRIORITY_FIELDS = [
    {
      title: "Very Hight",
      priority: ERROR_PRIORITY.veryHight
    },
    {
      title: "Hight",
      priority: ERROR_PRIORITY.hight
    },
    {
      title: "Middle",
      priority: ERROR_PRIORITY.middle
    },
    {
      title: "Low",
      priority: ERROR_PRIORITY.low
    }
  ];
  BUTTON_CAPTIONS = {
    open: "Open",
    solve: "Solve",
    close: "Close"
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.requestError(id);
  }

  isTargetTab(targetTabName) {
    return this.props.singleError.status === targetTabName;
  }

  renderActionButtonCell(isRender, buttonElement) {
    return isRender ? buttonElement : null;
  }

  isNewTab() {
    return this.isTargetTab(ERROR_STATUSES.new);
  }

  isOpenTab() {
    return this.isTargetTab(ERROR_STATUSES.open);
  }

  isSolvedTab() {
    return this.isTargetTab(ERROR_STATUSES.solved);
  }

  isClosedTab() {
    return this.isTargetTab(ERROR_STATUSES.closed);
  }

  getButton({ caption, onClickHandler, id }) {
    return (
      <Button
        onClick={onClickHandler ? onClickHandler.bind(this) : null}
        id={id}
        variant="outlined"
        color="primary"
        className={this.props.classes.button}
      >
        {caption}
      </Button>
    );
  }

  renderOpenButton() {
    return this.renderActionButtonCell(
      this.isNewTab() || this.isSolvedTab(),
      this.getButton({
        onClickHandler: this.handleClickOpen,
        caption: this.BUTTON_CAPTIONS.open,
        id: ERROR_STATUSES.open
      })
    );
  }

  onOpenHandler = () => {
    const { comment, actionType } = this.state;
    let newStatus, action;
    switch (actionType) {
      case ERROR_STATUSES.open:
        newStatus = ERROR_STATUSES.open;
        action = ERROR_ACTIONS.opened;
        break;
      case ERROR_STATUSES.solved:
        newStatus = ERROR_STATUSES.solved;
        action = ERROR_ACTIONS.solved;
        break;
      case ERROR_STATUSES.closed:
        newStatus = ERROR_STATUSES.closed;
        action = ERROR_ACTIONS.closed;
        break;
      default:
        newStatus = ERROR_STATUSES.new;
        action = ERROR_ACTIONS.registered;
    }

    const currentDate = new Date()
      .toJSON()
      .slice(0, 10)
      .replace(/-/g, "/");
    const { singleError } = this.props;
    const historyEvent = {
      date: currentDate,
      action,
      comment,
      user: this.props.user
    };
    const history = singleError.history;
    history.push(historyEvent);
    const error = {
      ...singleError,
      status: newStatus,
      history
    };
    this.props.apply(singleError.id, error);
    this.dialogCloseHandler();
  };

  renderSolveButton = () => {
    return this.renderActionButtonCell(
      this.isOpenTab(),
      this.getButton({
        onClickHandler: this.handleClickOpen,
        caption: this.BUTTON_CAPTIONS.solve,
        id: ERROR_STATUSES.solved
      })
    );
  };

  renderCloseButton() {
    return this.renderActionButtonCell(
      this.isSolvedTab(),
      this.getButton({
        onClickHandler: this.handleClickOpen,
        caption: this.BUTTON_CAPTIONS.close,
        id: ERROR_STATUSES.closed
      })
    );
  }

  dialogCloseHandler = () => {
    this.setState({ showDialog: false });
  };

  handleClickOpen = event => {
    this.setState({
      actionType: event.currentTarget.id
    });
    this.setState(prevState => {
      return { showDialog: !prevState.showDialog };
    });
  };
  handleUpdateToggle = () => {
    this.setState(prevState => {
      return { showUpdateForm: !prevState.showUpdateForm };
    });
  };
  handleDialogChange = event => {
    const target = event.target.value;
    this.setState({
      comment: target
    });
  };
  handleSubmit = values => {
    const {
      registryDate,
      id,
      author,
      status,
      history
    } = this.props.singleError;
    const errorData = {
      shortDescription: values.shortDescription,
      description: values.description,
      priority: values.priority,
      severity: values.severity,
      registryDate,
      id,
      author,
      status,
      history
    };
    this.props.updateError(errorData, id);
  };

  render() {
    const { singleError } = this.props;
    let error = null;
    if (this.props.singleError) {
      const UpdateForm = this.state.showUpdateForm ? (
        <ErrorBuilderForm submit={this.handleSubmit} data={singleError} />
      ) : null;
      const errorSeverity = this.ERROR_SEVERITY_FIELDS.filter(
        ({ title, severity }) => singleError.severity === severity
      );

      const errorPriority = this.ERROR_PRIORITY_FIELDS.filter(
        ({ title, priority }) => singleError.priority === priority
      );
      const errorInfo = (
        <React.Fragment>
          <Grid item xs={12}>
            <Typography variant="h3" gutterBottom>
              {this.props.singleError.shortDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Description :
              <Typography variant="subtitle1" gutterBottom>
                {this.props.singleError.description}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Author :
              <Typography variant="subtitle1" gutterBottom>
                {this.props.singleError.author.name}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Priority :{" "}
              <Typography variant="subtitle1" gutterBottom>
                {errorPriority[0].title}
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Severity :
              <Typography variant="subtitle1" gutterBottom>
                {errorSeverity[0].title}
              </Typography>
            </Typography>
          </Grid>
        </React.Fragment>
      );

      error = (
        <Grid>
          {errorInfo}
          <Grid item>
            {this.renderOpenButton()}
            {this.renderSolveButton()}
            {this.renderCloseButton()}
          </Grid>
          <ChangeStatusDialog
            isOpen={this.state.showDialog}
            handleClose={this.dialogCloseHandler}
            handeChange={this.handleDialogChange}
            handleApply={this.onOpenHandler}
            isEmpty={this.state.comment}
          />
          <Grid item>
            <Button
              variant="outlined"
              onClick={this.handleUpdateToggle}
              className={this.props.classes.button}
            >
              Update error report
            </Button>
          </Grid>
          <Container>{UpdateForm}</Container>
          <HistoryTable history={this.props.singleError.history} />
        </Grid>
      );
    }
    return <Container maxWidth="md">{error}</Container>;
  }
}

const mapStateToProps = state => {
  return {
    singleError: state.singleError.singleError,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestError: id => dispatch(actions.requestSingleError(id)),
    apply: (id, error, message) =>
      dispatch(actions.setErrorToOpen(id, error, message)),
    updateError: (errorData, id) =>
      dispatch(actions.updateErrorReport(errorData, id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ErrorPage));
