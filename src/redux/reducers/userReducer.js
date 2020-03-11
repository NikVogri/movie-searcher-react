import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userName: null,
  userId: null,
  errorMsg: "",
  isLoading: false,
  registrationSuccess: false
};

const userReducer = (state = initialState, action) => {
  console.log(action);
  // console.log(state);
  switch (action.type) {
    case actionTypes.LOGIN_USER_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload.token,
        userName: action.payload.user.name,
        userId: action.payload.user.id
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
        token: null
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
