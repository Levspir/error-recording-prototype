import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  singleError: null
};

const singleError = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SINGLE_ERROR_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REQUEST_SINGLE_ERROR_SUCCESS:
      return {
        ...state,
        loading: false,
        singleError: action.singleError
      };
    case actionTypes.REQUEST_SINGLE_ERROR_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default singleError;
