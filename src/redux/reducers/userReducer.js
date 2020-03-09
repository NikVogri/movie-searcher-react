import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  loggedInTime: null,
  errorMsg: "",
  isLoading: false,
  registrationSuccess: false
};

const userReducer = (state = initialState, action) => {
  // console.log(action);
  // console.log(state);
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loggedInTime: new Date().getTime()
      };
    case actionTypes.LOGIN_USER_FAIL:
      return {
        ...state,
        token: null,
        errorMsg: action.payload
      };
    case actionTypes.CREATE_USER_FAIL:
      return {
        ...state,
        token: null,
        errorMsg: action.payload
      };
    case actionTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        registrationSuccess: true
      };
    case actionTypes.LOGOUT_USER:
      return {
        ...state,
        token: null,
        loggedInTime: null
      };
    case actionTypes.REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: ""
      };
    case actionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
