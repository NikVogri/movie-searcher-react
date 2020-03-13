import * as actionTypes from "../actions/actionTypes";

const initialState = {
  watchedError: "",
  message: "",
  alreadyWatched: false,
  items: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WATCHED_SUCCESS:
      return {
        ...state,
        message: action.payload
      };
    case actionTypes.ADD_TO_WATCHED_FAIL:
      return {
        ...state,
        watchedError: action.payload
      };
    case actionTypes.FETCH_WATCHED_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        items: action.payload.items
      };
    case actionTypes.FETCH_WATCHED_FAIL:
      return {
        ...state,
        watchedError: action.payload
      };
    case actionTypes.CHECK_IF_ON_WATCHED_SUCCESS:
      return {
        ...state,
        alreadyWatched: action.payload
      };
    default:
      return state;
  }
};
