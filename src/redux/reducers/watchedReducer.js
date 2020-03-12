import * as actionTypes from "../actions/actionTypes";

const initialState = {
  watchedError: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_WATCHED_SUCCESS:
      return {
        ...state,
        watchedError: ""
      };
    case actionTypes.ADD_TO_WATCHED_FAIL:
      return {
        ...state,
        watchedError: action.payload.errorMessage
      };
    default:
      return state;
  }
};
