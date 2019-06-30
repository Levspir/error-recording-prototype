import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import * as actions from "../../store/actions/index";

import CustomTableHead from "../../components/CustomTableHead/CustomTableHead";
import { ERROR_SEVERITY, ERROR_PRIORITY } from "../../constants/errorConstants";

const styles = {
  root: {
    width: "100%",
    marginTop: 20
  },
  paper: {
    width: "100%",
    marginBottom: 10
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: "auto"
  }
};

class RecordsResult extends Component {
  state = {
    order: "asc",
    orderBy: "shortDescription",
    page: 0,
    rowsPerPage: 5
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

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  componentDidMount() {
    this.props.requestRecords();
  }

  handleChangeRowsPerPage = event => {
    this.setState(prevState => {
      return {
        rowsPerPage: prevState.rowsPerPage + event.target.value
      };
    });
  };

  handleRequestSort = (event, property) => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState((prevState, props) => {
      return { order: isDesc ? "asc" : "desc" };
    });
    this.setState({
      orderBy: property
    });
  };
  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };
  handleClick = id => {
    this.props.history.push("/error/" + id);
  };

  render() {
    const { errorsRecord } = this.props;

    let table = null;

    if (errorsRecord) {
      table = (
        <div className={this.props.classes.root}>
          <Paper className={this.props.classes.paper}>
            <div className={this.props.classes.tableWrapper}>
              <Table
                className={this.props.classes.table}
                aria-labelledby="tableTitle"
                size="medium"
              >
                <CustomTableHead
                  order={this.state.order}
                  orderBy={this.state.orderBy}
                  onRequestSort={this.handleRequestSort}
                  rowCount={errorsRecord.length}
                />
                <TableBody>
                  {this.stableSort(
                    errorsRecord,
                    this.getSorting(this.state.order, this.state.orderBy)
                  )
                    .slice(
                      this.state.page * this.state.rowsPerPage,
                      this.state.page * this.state.rowsPerPage +
                        this.state.rowsPerPage
                    )
                    .map((row, index) => {
                      const errorSeverity = this.ERROR_SEVERITY_FIELDS.filter(
                        ({ title, severity }) => row.severity === severity
                      );

                      const errorPriority = this.ERROR_PRIORITY_FIELDS.filter(
                        ({ title, priority }) => row.priority === priority
                      );
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={() => this.handleClick(row.id)}
                          tabIndex={-1}
                          key={row.name}
                        >
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="default"
                            align="left"
                          >
                            {row.shortDescription}
                          </TableCell>
                          <TableCell align="left">{row.author.name}</TableCell>
                          <TableCell align="left" component="th">
                            {errorPriority[0].title}
                          </TableCell>
                          <TableCell align="left">
                            {errorSeverity[0].title}
                          </TableCell>
                          <TableCell align="right">
                            {row.registryDate}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={errorsRecord.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      );
    }

    return <Container component="main">{table}</Container>;
  }
}

const mapStateToProps = state => {
  return {
    errorsRecord: state.errorRecords.errorRecords
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestRecords: () => dispatch(actions.requestErrors())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(RecordsResult));
