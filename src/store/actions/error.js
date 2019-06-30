import * as actionTypes from "./actionTypes";

const errorReportStart = () => {
  return {
    type: actionTypes.REPORT_ERROR_START
  };
};

const errorReportSuccess = () => {
  return {
    type: actionTypes.REPORT_ERROR_SUCCESS
  };
};

const errorReportFail = error => {
  return {
    type: actionTypes.REPORT_ERROR_FAIL,
    error
  };
};

export const errorReport = reportData => {
  return dispatch => {
    dispatch(errorReportStart());
    try {
      let changedStore = JSON.parse(localStorage.getItem("errors"));
      if (changedStore) {
        changedStore.push(reportData);
        localStorage.setItem("errors", JSON.stringify(changedStore));
      } else {
        const errorData = [];
        errorData.push(reportData);
        localStorage.setItem("errors", JSON.stringify(errorData));
      }
      dispatch(errorReportSuccess());
    } catch (error) {
      dispatch(errorReportFail(error));
    }
  };
};

const updateErrorReportStart = () => {
  return {
    type: actionTypes.UPDATE_REPORT_ERROR_START
  };
};

const updateErrorReportSuccess = () => {
  return {
    type: actionTypes.UPDATE_REPORT_ERROR_SUCCESS
  };
};

const updateErrorReportFail = error => {
  return {
    type: actionTypes.UPDATE_REPORT_ERROR_FAIL,
    error
  };
};

export const updateErrorReport = (reportData, id) => {
  return dispatch => {
    dispatch(updateErrorReportStart());
    try {
      let changedStore = JSON.parse(localStorage.getItem("errors"));
      const index = changedStore.findIndex(error => error.id === id);
      const updatedArray = replaceAt(changedStore, index, reportData);
      localStorage.setItem("errors", JSON.stringify(updatedArray));
      dispatch(requestSingleError(id));

      dispatch(updateErrorReportSuccess());
    } catch (error) {
      dispatch(updateErrorReportFail(error));
    }
  };
};

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

const requestErrorsStart = () => {
  return {
    type: actionTypes.REQUEST_ERRORS_START
  };
};

const requestErrorsSuccess = errors => {
  return {
    type: actionTypes.REQUEST_ERRORS_SUCCESS,
    errors
  };
};

const requestErrorsFail = error => {
  return {
    type: actionTypes.REQUEST_ERRORS_FAIL,
    error
  };
};

export const requestErrors = () => {
  return dispatch => {
    dispatch(requestErrorsStart());
    try {
      const errors = JSON.parse(localStorage.getItem("errors"));
      dispatch(requestErrorsSuccess(errors));
    } catch (error) {
      dispatch(requestErrorsFail(error));
    }
  };
};

const requestSingleErrorStart = () => {
  return {
    type: actionTypes.REQUEST_SINGLE_ERROR_START
  };
};

const requestSingleErrorSuccess = singleError => {
  return {
    type: actionTypes.REQUEST_SINGLE_ERROR_SUCCESS,
    singleError
  };
};

const requestSingleErrorFail = error => {
  return {
    type: actionTypes.REQUEST_SINGLE_ERROR_FAIL,
    error
  };
};

export const requestSingleError = id => {
  return dispatch => {
    dispatch(requestSingleErrorStart());
    try {
      const errors = JSON.parse(localStorage.getItem("errors"));
      const singleError = errors.find(error => error.id === id);
      dispatch(requestSingleErrorSuccess(singleError));
    } catch (error) {
      dispatch(requestSingleErrorFail(error));
    }
  };
};

export const setErrorToOpen = (id, error, message) => {
  return dispatch => {
    try {
      const errors = JSON.parse(localStorage.getItem("errors"));
      const index = errors.findIndex(error => error.id === id);
      const updatedArray = replaceAt(errors, index, error);
      localStorage.setItem("errors", JSON.stringify(updatedArray));
      dispatch(requestSingleError(id));
    } catch {}
  };
};
