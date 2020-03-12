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
        console.log(err);
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
        console.log(res);
        dispatch(setLoading(false));
        if (!res.data.success) {
          // get message from retrieved object
          return dispatch(registrationFail(res.data.msg));
        }
        dispatch(registrationSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
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
          return dispatch({
            type: actionTypes.ADD_TO_WATCHED_FAIL,
            payload: res.data.msg
          });
        }
        // if fetch is successful
        dispatch({
          type: actionTypes.ADD_TO_WATCHED_SUCCESS,
          payload: "Item added to watch list"
        });
      })
      .catch(err => {
        // if theres an internal error
        dispatch({
          type: actionTypes.ADD_TO_WATCHED_FAIL,
          payload: err.message
        });
      });
  };
};

// fetch from list

export const fetchWatched = userId => {
  console.log(userId);
  return dispatch => {
    dispatch(setLoading(true));
    axios
      .get(`http://localhost:8000/api/content/watched/${userId}`)
      .then(res => {
        if (!res.data.success) {
          return dispatch({
            type: actionTypes.FETCH_WATCHED_FAIL,
            payload: res.data.msg
          });
        }
        dispatch(setLoading(false));
        dispatch({
          type: actionTypes.FETCH_WATCHED_SUCCESS,
          payload: {
            message: "Successfully fetched data",
            items: res.data.items
          }
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.ADD_TO_WATCHED_FAIL,
          payload: err.message
        });
        dispatch(setLoading(false));
      });
  };
};
