import axios from "axios";

import * as actionTypes from "./actionTypes";

const replaceAt = (array, index, value) => {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
};

const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  };
};

const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

const requestUsersStart = () => {
  return {
    type: actionTypes.REQUEST_USERS_START
  };
};

const requestUsersSuccess = users => {
  return {
    type: actionTypes.REQUEST_USERS_SUCCESS,
    users
  };
};

const requestUsersFail = error => {
  return {
    type: actionTypes.REQUEST_USERS_FAIL,
    error
  };
};

export const requestUsers = () => {
  return dispatch => {
    dispatch(requestUsersStart());
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      dispatch(requestUsersSuccess(users));
    } catch (error) {
      dispatch(requestUsersFail(error));
    }
  };
};

const requestUserStart = () => {
  return {
    type: actionTypes.REQUEST_USER_START
  };
};

const requestUserSuccess = user => {
  return {
    type: actionTypes.REQUEST_USER_SUCCESS,
    user
  };
};

const requestUserFail = error => {
  return {
    type: actionTypes.REQUEST_USER_FAIL,
    error
  };
};

export const requestUser = id => {
  return dispatch => {
    dispatch(requestUserStart());
    try {
      const users = JSON.parse(localStorage.getItem("users"));
      const user = users.find(user => user.id === id);
      dispatch(requestUserSuccess(user));
    } catch (error) {
      dispatch(requestUserFail(error));
    }
  };
};
const saveUser = info => {
  let changedStore = JSON.parse(localStorage.getItem("users"));
  if (changedStore) {
    changedStore.push(info);
    localStorage.setItem("users", JSON.stringify(changedStore));
  } else {
    const userData = [];
    userData.push(info);
    localStorage.setItem("users", JSON.stringify(userData));
  }
};

const updateUserStart = () => {
  return {
    type: actionTypes.UPDATE_USER_START
  };
};

const updateUserSuccess = () => {
  return {
    type: actionTypes.UPDATE_USER_SUCCESS
  };
};

const updateUserFail = error => {
  return {
    type: actionTypes.UPDATE_USER_FAIL,
    error
  };
};

export const updateUser = (userData, id) => {
  return dispatch => {
    dispatch(updateUserStart());
    try {
      const userId = localStorage.getItem("userId");
      let changedStore = JSON.parse(localStorage.getItem("users"));
      const index = changedStore.findIndex(user => user.id === userId);
      const updatedArray = replaceAt(changedStore, index, userData);
      localStorage.setItem("users", JSON.stringify(updatedArray));
      dispatch(updateUserSuccess());

      dispatch(requestUser(id));
    } catch (error) {
      dispatch(updateUserFail(error));
    }
  };
};

export const auth = (email, password, isSignUp, name, surName) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDhx9Piq56ATsUCF-ly7COfys1SIaMRewo";
    if (!isSignUp) {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDhx9Piq56ATsUCF-ly7COfys1SIaMRewo";
    }
    axios
      .post(url, authData)
      .then(response => {
        const user = {
          id: response.data.localId,
          name,
          surName,
          email
        };
        if (isSignUp) {
          saveUser(user);
        }
        dispatch(requestUser(response.data.localId));
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(requestUser(userId));
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
