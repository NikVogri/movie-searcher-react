import * as actionTypes from "./actionTypes";
import axios from "axios";

/////////
// loading actions
const setLoading = status => ({
  type: actionTypes.SET_LOADING,
  payload: status
});

//////
// error actions
export const clearError = () => ({
  type: actionTypes.REMOVE_ERROR_MESSAGE
});

///////
// auth actions
export const loginSuccess = data => ({
  type: actionTypes.LOGIN_USER_SUCCESS,
  payload: data
});

const loginFail = errorMsg => ({
  type: actionTypes.LOGIN_USER_FAIL,
  payload: errorMsg
});

const registrationSuccess = data => ({
  type: actionTypes.CREATE_USER_SUCCESS,
  payload: data
});

const registrationFail = errorMsg => ({
  type: actionTypes.CREATE_USER_FAIL,
  payload: errorMsg
});

export const loginUser = formBody => {
  return dispatch => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url: "http://localhost:8000/api/user/login",
      data: formBody
    })
      .then(res => {
        dispatch(setLoading(false));
        if (!res.data.success) {
          // get message from retrieved object
          return dispatch(loginFail(res.data.msg));
        }
        const expirationTime = new Date().getTime() + 1000 * 60 * 60;
        localStorage.setItem(
          "userAuth",
          JSON.stringify({
            token: res.data.token,
            user: { name: res.data.user.name, id: res.data.user.id },
            expirationTime
          })
        );
        dispatch(loginSuccess(res.data));
      })
      .catch(err => {
        dispatch(loginFail(err.message));
        dispatch(setLoading(false));
      });
  };
};

export const createUser = formBody => {
  return dispatch => {
    dispatch(setLoading(true));
    axios({
      method: "POST",
      url: "http://localhost:8000/api/user/register",
      data: formBody
    })
      .then(res => {
        dispatch(setLoading(false));
        if (!res.data.success) {
          // get message from retrieved object
          return dispatch(registrationFail(res.data.msg));
        }
        dispatch(registrationSuccess(res.data));
      })
      .catch(err => {
        dispatch(registrationFail(err.message));
        dispatch(setLoading(false));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("userAuth");
  return {
    type: actionTypes.LOGOUT_USER
  };
};

///////////
// watched actions

// add to list
export const addToWatched = (item, token) => {
  return dispatch => {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/content/add-to-watched",
      headers: { authorization: `bearer ${token}` },
      data: item
    })
      .then(res => {
        if (!res.data.success) {
          // get message from retrieved object
          return dispatch(addToWatchedFail(res.data.msg));
        }
        // if fetch is successful
        dispatch(addToWatchedSuccess());
      })
      .catch(err => {
        // if theres an internal error
        dispatch(addToWatchedFail(err.message));
      });
  };
};

const addToWatchedFail = errorMessage => ({
  type: actionTypes.ADD_TO_WATCHED_FAIL,
  payload: errorMessage
});

const addToWatchedSuccess = () => ({
  type: actionTypes.ADD_TO_WATCHED_SUCCESS,
  payload: "Item added to watch list"
});

// fetch from list

export const fetchWatched = (userId, token) => {
  return dispatch => {
    dispatch(setLoading(true));
    axios({
      method: "GET",
      url: `http://localhost:8000/api/content/watched/${userId}`,
      headers: { authorization: `bearer ${token}` }
    })
      .then(res => {
        // if fetch is unsuccessful
        if (!res.data.success) {
          return dispatch(fetchWatchedFail(res.data.msg));
        }
        // if fetch is successful
        dispatch(setLoading(false));
        dispatch(fetchWatchedSuccess(res.data.items));
      })
      .catch(err => {
        // if fetch encounters
        dispatch(fetchWatchedFail(err.message));
        dispatch(setLoading(false));
      });
  };
};

const fetchWatchedFail = errorMsg => ({
  type: actionTypes.FETCH_WATCHED_FAIL,
  payload: errorMsg
});
const fetchWatchedSuccess = items => ({
  type: actionTypes.FETCH_WATCHED_SUCCESS,
  payload: {
    message: "Successfully fetched data",
    items
  }
});

export const checkIfAlreadyOnWatched = (contentId, token) => {
  return dispatch => {
    axios({
      method: "GET",
      url: `http://localhost:8000/api/content/watched/check/${contentId}`,
      headers: { authorization: `bearer ${token}` }
    })
      .then(res => {
        if (!res.data.success) {
          // get message from retrieved object
          return dispatch(fetchWatchedFail(res.data.msg));
        }
        // if fetch is successful
        dispatch(checkIfAlreadyOnWatchedSuccess(res.data.isOnList));
      })
      .catch(err => {
        // if theres an internal error
        dispatch(fetchWatchedFail(err.message));
      });
  };
};

const checkIfAlreadyOnWatchedSuccess = status => ({
  type: actionTypes.CHECK_IF_ON_WATCHED_SUCCESS,
  payload: status
});
