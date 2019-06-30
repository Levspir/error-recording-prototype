import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  error: null,
  user: null,
  users: null
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_USER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REQUEST_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user
      };
    case actionTypes.REQUEST_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.REQUEST_USERS_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REQUEST_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.users
      };
    case actionTypes.REQUEST_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default users;
