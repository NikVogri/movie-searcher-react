import { combineReducers } from "redux";
import userReducer from "./userReducer";
import watchedReducer from "./watchedReducer";

const rootReducer = combineReducers({
  user: userReducer,
  watched: watchedReducer
});

export default rootReducer;
