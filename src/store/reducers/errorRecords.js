import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  errorRecords: null
};

const error = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_ERRORS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REQUEST_ERRORS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorRecords: action.errors
      };
    case actionTypes.REQUEST_ERRORS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default error;
